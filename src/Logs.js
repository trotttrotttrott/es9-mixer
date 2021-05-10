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

    this.MIDIMessageTypes = {
      0x32: {
        type: 'Version',
        parse: function(data) {
          return `Version ${String.fromCharCode.apply(null, data.slice(6, -1))}`;
        }
      },
      0x10: {
        type: 'Config Dump',
        parse: function(data) {
          return data;
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
          return data;
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
    var arr = [0xF0, 0x00, 0x21, 0x27, 0x19, 0x22, 0xF7];
    this.log('Sending version request to ES-9...');
    this.tx(arr);
    output.send(arr);
  }

  render() {
    return (
      <div className="Logs">
        <div className="buttons">
          <ButtonGroup variant="contained" size="small">
            <Button onClick={this.requestVersion.bind(this)}>Request ES-9 Version</Button>
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
