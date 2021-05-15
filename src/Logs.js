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

    this.logRef = React.createRef();
    this.rxRef = React.createRef();
    this.txRef = React.createRef();

    props.es9.input.onmidimessage = this.onMIDIMessage.bind(this);

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
          return 'Config dump received\nNo behavior for this message type is implemented';
        }
      },
      0x11: {
        type: 'Mix Dump',
        parse: function(data) {
          return 'Mix dump received\nNo behavior for this message type is implemented';
        }
      },
      0x12: {
        type: 'Usage',
        parse: function(data) {
          return 'Usage data received\nNo behavior for this message type is implemented';
        }
      }
    };
  }

  componentDidUpdate() {
    this.logRef.current.scrollTop = this.logRef.current.scrollHeight;
    this.rxRef.current.scrollTop = this.rxRef.current.scrollHeight;
    this.txRef.current.scrollTop = this.txRef.current.scrollHeight;
  }

  onMIDIMessage(message) {
    this.props.log.info(`Received sysex (${message.data.length} bytes)`);
    var type = this.MIDIMessageTypes[message.data[5]];
    this.props.log.rx(type.parse(message.data));
  }

  requestVersion() {
    var arr = [ 0xF0, 0x00, 0x21, 0x27, 0x19, 0x22, 0xF7 ];
    this.props.log.info('Requesting version');
    this.props.log.tx(arr);
    this.props.es9.output.send(arr);
  }

  requestConfig() {
    var arr = [ 0xF0, 0x00, 0x21, 0x27, 0x19, 0x23, 0xF7 ];
    this.props.log.info('Requesting config');
    this.props.log.tx(arr);
    this.props.es9.output.send(arr);
  }

  requestUsage() {
    var arr = [ 0xF0, 0x00, 0x21, 0x27, 0x19, 0x2B, 0xF7 ];
    this.props.log.info('Requesting usage');
    this.props.log.tx(arr);
    this.props.es9.output.send(arr);
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
              ref={this.logRef}
              value={this.props.logs.info}
              rowsMin={10}
              rowsMax={10}
            />
          </Grid>
          <Grid item xs={4}>
            <TextareaAutosize
              readOnly
              ref={this.txRef}
              value={this.props.logs.tx}
              rowsMin={10}
              rowsMax={10}
            />
          </Grid>
          <Grid item xs={4}>
            <TextareaAutosize
              readOnly
              ref={this.rxRef}
              value={this.props.logs.rx}
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
