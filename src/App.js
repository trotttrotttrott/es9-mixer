import React from 'react';
import Status from './Status';
import MIDI from './MIDI/MIDI';
import Mixes from './Mixes/Mixes';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.es9 = {};

    this.config = {
      hideMixes: [],
      disableChannels: []
    };

    if (process.env.REACT_APP_HIDE_MIXES) {
      this.config.hideMixes = process.env.REACT_APP_HIDE_MIXES.split(' ').map(function(element) {
        return parseInt(element);
      });
    }

    if (process.env.REACT_APP_DISABLE_CHANNELS) {
      process.env.REACT_APP_DISABLE_CHANNELS.split(' ').forEach(function(element) {
        var [mix, channel] = element.split(':');
        if (!this.config.disableChannels[mix]) {
          this.config.disableChannels[mix] = [];
        }
        this.config.disableChannels[mix].push(parseInt(channel));
      }.bind(this));
    }
  }

  componentDidMount() {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: true
      }).then(
        this.onMIDISuccess.bind(this),
        this.onMIDIFailure.bind(this)
      );
    } else {
      this.setState({
        midiSupport: false,
        statusMessage: 'No MIDI support in your browser.'
      });
    }
  }

  onMIDISuccess(midi) {

    midi.inputs.forEach(function(value, key, map) {
      if (value.name === 'ES-9 MIDI In') {
        this.es9.input = value;
        return;
      }
    }.bind(this));
    midi.outputs.forEach(function(value, key, map) {
      if (value.name === 'ES-9 MIDI Out') {
        this.es9.output = value;
        return;
      }
    }.bind(this));

    if ([this.es9.input, this.es9.output].includes(undefined)) {
      this.setState({
        midiSupport: false,
        statusMessage: 'ES-9 not found.'
      });
      return;
    }

    this.setState({
      midiSupport: true,
      statusMessage: 'OK',
      midiInfo: `This version is for ES-9 firmware v1.2.0 and above.

ES-9 MIDI input ID: ${this.es9.input.id}
ES-9 MIDI output ID: ${this.es9.output.id}

`,
      midiRx: ''
    });
  }

  onMIDIFailure(msg) {
    this.setState({
      midiSupport: false,
      statusMessage: msg
    });
  }

  midiInfo(msg) {
    var time = new Date().toLocaleTimeString();
    this.setState({
      midiInfo: `${this.state.midiInfo}${time}: ${msg}\n`
    });
  }

  midiRx(msg) {
    this.setState({
      midiRx: `${this.state.midiRx}${msg}\n`
    });
  }

  setMixes(mixes) {
    this.setState({
      mixes: mixes
    });
  }

  updateVolume(mix, channel, volume) {
    var mixes = this.state.mixes;
    mixes[mix][channel - 1].volume = volume;
    this.setMixes(mixes);
    this.es9.output.send([0xF0, 0x00, 0x21, 0x27, 0x19, 0x34, mix * 8 + (channel - 1), volume, 0xF7]);
  }

  render() {
    if (this.state === null || this.state.midiSupport === null) {
      return (
        <>Loading...</>
      )
    } else if (!this.state.midiSupport) {
      return (
        <>
          <Status
            midiSupport={this.state.midiSupport}
            message={this.state.statusMessage}
          />
        </>
      )
    } else {
      return (
        <>
          <Status
            midiSupport={this.state.midiSupport}
            message={this.state.statusMessage}
          />
          <MIDI
            es9={this.es9}
            midi={{ info: this.state.midiInfo, rx: this.state.midiRx }}
            midiInfo={this.midiInfo.bind(this)}
            midiRx={this.midiRx.bind(this)}
            setMixes={this.setMixes.bind(this)}
          />
          <Mixes
            mixes={this.state.mixes}
            hideMixes={this.config.hideMixes}
            disableChannels={this.config.disableChannels}
            updateVolume={this.updateVolume.bind(this)}
          />
        </>
      )
    }
  }
}

export default App;
