import React from 'react';
import './MIDI.css'
import {
  Grid,
  TextareaAutosize
} from '@material-ui/core';

import ConfigDump from './Message/ConfigDump'
import MixDump from './Message/MixDump'
import SampleRate from './Message/SampleRate'
import Usage from './Message/Usage'
import Version from './Message/Version'

class MIDI extends React.Component {

  constructor(props) {
    super(props)

    this.types = {};
    this.types[ConfigDump.id] = ConfigDump;
    this.types[MixDump.id] = MixDump;
    this.types[SampleRate.id] = SampleRate;
    this.types[Usage.id] = Usage;
    this.types[Version.id] = Version;

    this.logRef = React.createRef();
    this.rxRef = React.createRef();

    props.es9.input.onmidimessage = this.onMIDIMessage.bind(this);
  }

  componentDidUpdate() {
    this.logRef.current.scrollTop = this.logRef.current.scrollHeight;
    this.rxRef.current.scrollTop = this.rxRef.current.scrollHeight;
  }

  onMIDIMessage(message) {
    this.props.midiInfo(`Received sysex (${message.data.length} bytes)`);
    var type = this.types[message.data[5]];
    this.props.midiRx(`${type.name} received.`);
    var parsedData = type.parse(message.data);
    this.props.midiRx(parsedData || 'No behavior for this message type is implemented.');
  }

  render() {
    return (
      <Grid container spacing={1} className="MIDI">
        <Grid item xs={6}>
          <TextareaAutosize
            readOnly
            ref={this.logRef}
            value={this.props.midi.info}
            rowsMin={10}
            rowsMax={10}
          />
        </Grid>
        <Grid item xs={6}>
          <TextareaAutosize
            readOnly
            ref={this.rxRef}
            value={this.props.midi.rx}
            rowsMin={10}
            rowsMax={10}
          />
        </Grid>
      </Grid>
    )
  }
}

export default MIDI;
