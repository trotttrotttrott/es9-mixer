import React from 'react';
import Status from './Status';
import MIDI from './MIDI/MIDI';
import Mixes from './Mixes';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.es9 = {};
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
          />
        </>
      )
    }
  }
}

export default App;
