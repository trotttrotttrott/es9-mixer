import React from 'react';
import Status from './Status';
import Settings from './Settings/Settings';
import MIDI from './MIDI/MIDI';
import Mixes from './Mixes/Mixes';

import {
  createTheme,
  ThemeProvider
} from '@mui/material/styles';
import {
  teal,
  purple,
  cyan
} from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: cyan['A400'],
    },
    secondary: {
      main: purple['A400'],
    },
    tertiary: {
      main: teal['A200'],
    },
  },
});

class App extends React.Component {

  constructor(props) {
    super(props);

    this.es9 = {};
    this.midi = null;

    this.es9InputTarget = {
      name: 'ES-9 MIDI In',
      id: null
    };
    this.es9OutputTarget = {
      name: 'ES-9 MIDI Out',
      id: null
    };

    var settings = JSON.parse(window.localStorage.getItem('settings'));
    if (settings == null) {
      settings = {
        showMixes: Array(16).fill(true) // show all mixes by default
      }
      window.localStorage.setItem('settings', JSON.stringify(settings));
    }

    // Snapshots allow you to recall saved volume and pan values for mixes.
    // Each snapshot is scoped to a single mix.
    var snapshots = JSON.parse(window.localStorage.getItem('snapshots'));
    if (snapshots == null) {
      snapshots = Array(16).fill([]);
      window.localStorage.setItem('snapshots', JSON.stringify(snapshots));
    }

    this.state = {
      settings: settings,
      snapshots: snapshots,
    };
  }

  componentDidMount() {
    this.requestMIDI();
  }

  requestMIDI() {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: true
      }).then(
        this.onMIDISuccess.bind(this),
        this.onMIDIFailure.bind(this)
      );
    } else {
      this.setState({
        mixerReady: false,
        statusMessage: 'Browser does not support MIDI'
      });
    }
  }

  onMIDISuccess(midi) {

    this.midi = midi;

    var es9Inputs = [];
    var es9Outputs = [];


    midi.inputs.forEach(function(input, key, map) {
      if (this.es9InputTarget.id !== null) {
        if (input.id === this.es9InputTarget.id) {
          es9Inputs.push(input);
        }
      } else if (input.name === this.es9InputTarget.name) {
        es9Inputs.push(input);
      }
    }.bind(this));
    midi.outputs.forEach(function(output, key, map) {
      if (this.es9OutputTarget.id !== null) {
        if (output.id === this.es9OutputTarget.id) {
          es9Outputs.push(output);
        }
      } else if (output.name === this.es9OutputTarget.name) {
        es9Outputs.push(output);
      }
    }.bind(this));

    switch (true) {
      case es9Inputs.length === 0 || es9Outputs.length === 0:
        this.setState({
          mixerReady: false,
          statusMessage: 'ES-9 not detected'
        });
        return;
      case es9Inputs.length > 1 || es9Outputs.length > 1:
        this.setState({
          mixerReady: false,
          statusMessage: 'Multiple ES-9s detected'
        });
        return
      default:
        this.es9.input = es9Inputs[0];
        this.es9.output = es9Outputs[0];
    }

    this.setState({
      mixerReady: true,
      statusMessage: 'OK',
      midiInfo: `This version is for ES-9 firmware v1.3.0 and above.

ES-9 MIDI input ID: ${this.es9.input.id}
ES-9 MIDI output ID: ${this.es9.output.id}

`,
      midiRx: ''
    });
  }

  onMIDIFailure(msg) {
    this.es9 = {};
    this.setState({
      mixerReady: false,
      statusMessage: msg
    });
  }

  // Status functions

  setMIDI(inputID, outputID) {
    this.es9InputTarget.id = inputID;
    this.es9OutputTarget.id = outputID;
    this.requestMIDI();
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

  requestVersion() {
    this.midiInfo('Requesting version');
    this.es9.output.send([0xF0, 0x00, 0x21, 0x27, 0x19, 0x22, 0xF7]);
  }

  requestConfig() {
    this.midiInfo('Requesting config');
    this.es9.output.send([0xF0, 0x00, 0x21, 0x27, 0x19, 0x23, 0xF7]);
  }

  requestMix() {
    this.midiInfo('Requesting mix');
    this.es9.output.send([0xF0, 0x00, 0x21, 0x27, 0x19, 0x2A, 0xF7]);
  }

  setVersion(version) {
    this.setState({
      version: version
    });
  }

  setRouteIn(routeIn) {
    this.setState({
      routeIn: routeIn
    });
  }

  setRouteOut(routeOut) {
    this.setState({
      routeOut: routeOut
    });
  }

  setStereoLinks(stereoLinks) {
    this.setState({
      stereoLinks: stereoLinks
    });
  }

  // Mix functions

  updateVolume(mix, channel, volume) {
    var mixes = this.state.mixes;
    mixes[mix][channel - 1].volume = volume;
    this.setMixes(mixes);
    this.es9.output.send([0xF0, 0x00, 0x21, 0x27, 0x19, 0x34, mix * 8 + (channel - 1), volume, 0xF7]);
  }

  updatePan(mix, channel, pan) {
    var mixes = this.state.mixes;
    mixes[mix][channel - 1].pan = pan - 1;
    this.setMixes(mixes);
    this.es9.output.send([0xF0, 0x00, 0x21, 0x27, 0x19, 0x34, (mix + 1) * 8 + (channel - 1), pan, 0xF7]);
  }

  takeSnapshot(mix, channels) {
    var snapshots = JSON.parse(window.localStorage.getItem('snapshots'));
    snapshots[mix].push(channels);
    window.localStorage.setItem('snapshots', JSON.stringify(snapshots));
    this.setState({ snapshots: snapshots });
  }

  applySnapshot(mix, snapshot) {
    var snapshots = JSON.parse(window.localStorage.getItem('snapshots'));
    snapshots[mix][snapshot].forEach(function(e, i) {
      this.updateVolume(mix, i + 1, e.volume);
      this.updatePan(mix, i + 1, e.pan + 1);
    }.bind(this));
  }

  deleteSnapshot(mix, snapshot) {
    var snapshots = JSON.parse(window.localStorage.getItem('snapshots'));
    snapshots[mix].splice(snapshot, 1);
    window.localStorage.setItem('snapshots', JSON.stringify(snapshots));
    this.setState({ snapshots: snapshots });
  }

  render() {
    if (this.state === null || this.state.mixerReady === null) {
      return (
        <>Loading...</>
      )
    } else if (!this.state.mixerReady) {
      return (
        <ThemeProvider theme={theme}>
          <Status
            midi={this.midi}
            mixerReady={this.state.mixerReady}
            message={this.state.statusMessage}
            setMIDI={this.setMIDI.bind(this)}
          />
        </ThemeProvider>
      )
    } else {
      return (
        <ThemeProvider theme={theme}>
          <Settings
            version={this.state.version}
            mixes={this.state.mixes}
            settings={this.state.settings}
            showMix={this.showMix.bind(this)}
            stereoLinks={this.state.stereoLinks}
            routeIn={this.state.routeIn}
            routeOut={this.state.routeOut}
            requestConfig={this.requestConfig.bind(this)}
          />
          <MIDI
            es9={this.es9}
            midi={{ info: this.state.midiInfo, rx: this.state.midiRx }}
            midiInfo={this.midiInfo.bind(this)}
            midiRx={this.midiRx.bind(this)}
            setMixes={this.setMixes.bind(this)}
            setVersion={this.setVersion.bind(this)}
            setRouteIn={this.setRouteIn.bind(this)}
            setRouteOut={this.setRouteOut.bind(this)}
            setStereoLinks={this.setStereoLinks.bind(this)}
            requestVersion={this.requestVersion.bind(this)}
            requestConfig={this.requestConfig.bind(this)}
            requestMix={this.requestMix.bind(this)}
          />
          <Mixes
            mixes={this.state.mixes}
            settings={this.state.settings}
            updateVolume={this.updateVolume.bind(this)}
            updatePan={this.updatePan.bind(this)}
            stereoLinks={this.state.stereoLinks}
            routeIn={this.state.routeIn}
            routeOut={this.state.routeOut}
            takeSnapshot={this.takeSnapshot.bind(this)}
            applySnapshot={this.applySnapshot.bind(this)}
            deleteSnapshot={this.deleteSnapshot.bind(this)}
            snapshots={this.state.snapshots}
          />
        </ThemeProvider>
      )
    }
  }
}

export default App;
