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
      input: '',
      output: '',
      inputError: null,
      outputError: null,
      error: null
    };
  }

  setInput(e, item) {
    this.setState({
      input: item.props.value,
      inputError: ''
    });
  }

  setOutput(e, item) {
    this.setState({
      output: item.props.value,
      outputError: ''
    });
  }

  setMIDI() {

    var fail = false;

    if (this.state.input === '') {
      this.setState({
        inputError: 'Input not selected'
      })
      fail = true;
    }

    if (this.state.output === '') {
      this.setState({
        outputError: 'Output not selected'
      })
      fail = true;
    }

    if (fail) {
      return;
    }

    this.props.setMIDI(this.state.input, this.state.output);
  }

  render() {

    var inputs = [];
    var outputs = [];
    this.props.midi?.inputs.forEach(function(value, key, map) {
      inputs.push(<MenuItem key={value.id} value={value.name}>{value.name} ({value.id})</MenuItem>);
    });
    this.props.midi?.outputs.forEach(function(value, key, map) {
      outputs.push(<MenuItem key={value.id} value={value.name}>{value.name} ({value.id})</MenuItem>);
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
                value={this.state?.input}
                onChange={this.setInput.bind(this)}
              >{inputs}</Select>
              <FormHelperText error>{this.state.inputError}</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="ouput-label">Select MIDI Output</InputLabel>
              <Select
                labelId="output-label"
                label="Select MIDI Output"
                value={this.state?.output}
                onChange={this.setOutput.bind(this)}
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
