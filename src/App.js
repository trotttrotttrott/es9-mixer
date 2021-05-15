import React from 'react';
import Status from './Status';
import Logs from './Logs';
import Mixer from './Mixer';

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
      info: `This version is for ES-9 firmware v1.2.0 and above.

ES-9 MIDI input ID: ${this.es9.input.id}
ES-9 MIDI output ID: ${this.es9.output.id}

`,
      rx: 'Received Messages:\n',
      tx: 'Transmitted Messages:\n'
    });
  }

  onMIDIFailure(msg) {
    this.setState({
      midiSupport: false,
      statusMessage: msg
    });
  }

  info(data) {
    var time = new Date().toLocaleTimeString();
    this.setState({
      info: `${this.state.info}${time}: ${data}\n`
    });
  }

  rx(data) {
    this.setState({
      rx: `${this.state.rx}${data}\n`
    });
  }

  tx(data) {
    this.setState({
      tx: `${this.state.tx}${data}\n`
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

      const log = { info: this.info.bind(this), rx: this.rx.bind(this), tx: this.tx.bind(this) }
      const logs = { info: this.state.info, rx: this.state.rx, tx: this.state.tx }

      return (
        <>
          <Status
            midiSupport={this.state.midiSupport}
            message={this.state.statusMessage}
          />
          <Logs
            es9={this.es9}
            log={log}
            logs={logs}
          />
          <Mixer
            es9={this.es9}
            log={log}
          />
        </>
      )
    }
  }
}

export default App;
