import React from 'react';
import './Status.css';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';

class Status extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      inputID: '',
      outputID: '',
      inputError: null,
      outputError: null,
      error: null
    };
  }

  setInputID(e, item) {
    this.setState({
      inputID: item.props.value,
      inputError: ''
    });
  }

  setOutputID(e, item) {
    this.setState({
      outputID: item.props.value,
      outputError: ''
    });
  }

  setMIDI() {

    var fail = false;

    if (this.state.inputID === '') {
      this.setState({
        inputError: 'Input not selected'
      })
      fail = true;
    }

    if (this.state.outputID === '') {
      this.setState({
        outputError: 'Output not selected'
      })
      fail = true;
    }

    if (fail) {
      return;
    }

    this.props.setMIDI(this.state.inputID, this.state.outputID);
  }

  render() {

    var inputs = [];
    var outputs = [];
    this.props.midi?.inputs.forEach(function(input, key, map) {
      inputs.push(<MenuItem key={input.id} value={input.id}>{input.name} ({input.id})</MenuItem>);
    });
    this.props.midi?.outputs.forEach(function(output, key, map) {
      outputs.push(<MenuItem key={output.id} value={output.id}>{output.name} ({output.id})</MenuItem>);
    });

    return (
      <div className="Status">
        <div>
          <span className={String(this.props.mixerReady)}>{this.props.message}</span>
        </div>
        {
          inputs.length > 0 &&
          outputs.length > 0 &&
          <>
            <p>Select your ES-9 input and output below.</p>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="input-label">Select MIDI Input</InputLabel>
              <Select
                labelId="input-label"
                label="Select MIDI Input"
                value={this.state?.inputID}
                onChange={this.setInputID.bind(this)}
              >{inputs}</Select>
              <FormHelperText error>{this.state.inputError}</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="ouput-label">Select MIDI Output</InputLabel>
              <Select
                labelId="output-label"
                label="Select MIDI Output"
                value={this.state?.outputID}
                onChange={this.setOutputID.bind(this)}
              >{outputs}</Select>
              <FormHelperText error>{this.state.outputError}</FormHelperText>
            </FormControl>
            <FormControl fullWidth>
              <Button
                variant="outlined"
                sx={{ p: 1, width: '420px' }}
                onClick={this.setMIDI.bind(this)}
              >
                Submit
              </Button>
              <FormHelperText error>{this.state.error}</FormHelperText>
            </FormControl>
          </>
        }
      </div>
    );
  }
}

export default Status;
