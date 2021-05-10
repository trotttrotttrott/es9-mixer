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

`
    };
    props.midi.inputs.get(props.es9.inputID).onmidimessage = this.onMIDIMessage.bind(this);
  }

  onMIDIMessage(message) {
    this.log(`Received sysex (${message.data.length} bytes)`);
  }

  log(str) {
    var time = new Date().toLocaleTimeString();
    this.setState({
      logs: `${this.state.logs}${time}: ${str}\n`
    });
  }

  requestVersion() {
    var output = this.props.midi.outputs.get(this.props.es9.outputID);
    var arr = [0xF0, 0x00, 0x21, 0x27, 0x19, 0x22, 0xF7];
    this.log('Sending version request to ES-9...');
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
              id="log"
              readOnly
              value={this.state.logs}
              rowsMin={10}
              rowsMax={10}
            />
          </Grid>
          <Grid item xs={4}>
            <TextareaAutosize
              readOnly
              value={this.state.txSysex}
              rowsMin={10}
              rowsMax={10}
            />
          </Grid>
          <Grid item xs={4}>
            <TextareaAutosize
              readOnly
              value={this.state.rxSysex}
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
