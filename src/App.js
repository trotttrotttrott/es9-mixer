import React from 'react';
import Status from './Status';
import Settings from './Settings/Settings';
import MIDI from './MIDI/MIDI';
import Mixes from './Mixes/Mixes';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.es9 = {};

    var settings = JSON.parse(window.localStorage.getItem('settings'));
    if (settings == null) {
      settings = {
        showMixes: Array(16).fill(true) // show all mixes by default
      }
      window.localStorage.setItem('settings', JSON.stringify(settings));
    }
    this.state = {
      settings: settings
    };
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

  // Settings functions

  showMix(mix, show) {
    var settings = JSON.parse(window.localStorage.getItem('settings'));
    settings.showMixes[mix] = show;
    window.localStorage.setItem('settings', JSON.stringify(settings));
    this.setState({ settings: settings });
  }

  // MIDI functions

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

  setStereoLinks(stereoLinks) {
    this.setState({
      stereoLinks: stereoLinks
    });
  }

  setRouteIn(routeIn) {
    this.setState({
      routeIn: routeIn
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
          <Settings
            mixes={this.state.mixes}
            settings={this.state.settings}
            showMix={this.showMix.bind(this)}
            stereoLinks={this.state.stereoLinks}
            routeIn={this.state.routeIn}
          />
          <MIDI
            es9={this.es9}
            midi={{ info: this.state.midiInfo, rx: this.state.midiRx }}
            midiInfo={this.midiInfo.bind(this)}
            midiRx={this.midiRx.bind(this)}
            setMixes={this.setMixes.bind(this)}
            setStereoLinks={this.setStereoLinks.bind(this)}
            setRouteIn={this.setRouteIn.bind(this)}
          />
          <Mixes
            mixes={this.state.mixes}
            settings={this.state.settings}
            updateVolume={this.updateVolume.bind(this)}
          />
        </>
      )
    }
  }
}

export default App;
