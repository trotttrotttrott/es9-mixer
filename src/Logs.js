import React from 'react';
import {
  Button,
  ButtonGroup,
  Grid,
  TextareaAutosize
} from '@material-ui/core';
import './Logs.css';

class Logs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      logs: `This version is for ES-9 firmware v1.2.0 and above.

ES-9 MIDI input ID: ${props.es9.inputID}
ES-9 MIDI output ID: ${props.es9.outputID}

`,
      rx: 'Received Messages:\n',
      tx: 'Transmitted Messages:\n'
    };
    this.logs = React.createRef();
    props.midi.inputs.get(props.es9.inputID).onmidimessage = this.onMIDIMessage.bind(this);

    var nybbleChar = function(n) {
      if (n >= 10) {
        return String.fromCharCode('A'.charCodeAt( 0 ) + n - 10);
      }
      return String.fromCharCode('0'.charCodeAt( 0 ) + n);
    }

    this.MIDIMessageTypes = {
      0x32: {
        type: 'Version',
        parse: function(data) {
          var version = String.fromCharCode.apply(null, data.slice(6, -1));
          return `Version ${version}`;
        }
      },
      0x10: {
        type: 'Config Dump',
        parse: function(data) {
          return data.slice(8, -1);
        }
      },
      0x11: {
        type: 'Mix Dump',
        parse: function(data) {
          return data;
        }
      },
      0x12: {
        type: 'Usage',
        parse: function(data) {
          data = data.slice(6, -1);
          var i;
          var u0 = 0, u1 = 0;
          var str0 = "", str1 = "";
          for ( i=0; i<4; ++i ) {
            var n0 = data[3-i];
            var n1 = data[7-i];
            str0 += nybbleChar(n0);
            str1 += nybbleChar(n1);
            u0 |= n0 << (4*(3-i));
            u1 |= n1 << (4*(3-i));
          }
          return `${str0} : ${str1}\n${u0} : ${u1} - ${(4096-u0)} : ${(4096-u1)} - ${((u1 - u0) * 100.0 / (4096-u0)).toFixed(1)}%`;
        }
      }
    };
  }

  componentDidUpdate() {
    this.logs.current.scrollTop = this.logs.current.scrollHeight;
  }

  onMIDIMessage(message) {
    this.log(`Received sysex (${message.data.length} bytes)`);
    var type = this.MIDIMessageTypes[message.data[5]];
    this.rx(type.parse(message.data));
  }

  log(data) {
    var time = new Date().toLocaleTimeString();
    this.setState({
      logs: `${this.state.logs}${time}: ${data}\n`
    });
  }

  tx(data) {
    this.setState({
      tx: `${this.state.tx}${data}\n`
    });
  }

  rx(data) {
    this.setState({
      rx: `${this.state.rx}${data}\n`
    });
  }

  requestVersion() {
    var output = this.props.midi.outputs.get(this.props.es9.outputID);
    var arr = [ 0xF0, 0x00, 0x21, 0x27, 0x19, 0x22, 0xF7 ];
    this.log('Requesting version');
    this.tx(arr);
    output.send(arr);
  }

  requestConfig() {
    var output = this.props.midi.outputs.get(this.props.es9.outputID);
    var arr = [ 0xF0, 0x00, 0x21, 0x27, 0x19, 0x23, 0xF7 ];
    this.log('Requesting config');
    this.tx(arr);
    output.send(arr);
  }

  requestUsage() {
    var output = this.props.midi.outputs.get(this.props.es9.outputID);
    var arr = [ 0xF0, 0x00, 0x21, 0x27, 0x19, 0x2B, 0xF7 ];
    this.log('Requesting usage');
    this.tx(arr);
    output.send(arr);
  }

  render() {
    return (
      <div className="Logs">
        <div className="buttons">
          <ButtonGroup size="small" color="secondary">
            <Button onClick={this.requestVersion.bind(this)}>Request ES-9 Version</Button>
            <Button onClick={this.requestConfig.bind(this)}>Request Config</Button>
            <Button onClick={this.requestUsage.bind(this)}>Request Usage</Button>
          </ButtonGroup>
        </div>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <TextareaAutosize
              readOnly
              ref={this.logs}
              value={this.state.logs}
              rowsMin={10}
              rowsMax={10}
            />
          </Grid>
          <Grid item xs={4}>
            <TextareaAutosize
              readOnly
              value={this.state.tx}
              rowsMin={10}
              rowsMax={10}
            />
          </Grid>
          <Grid item xs={4}>
            <TextareaAutosize
              readOnly
              value={this.state.rx}
              rowsMin={10}
              rowsMax={10}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default Logs;
