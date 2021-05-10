import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Status from './Status';
import Logs from './Logs';
import Mixer from './Mixer';
import reportWebVitals from './reportWebVitals';

function render(midi, statusMsg) {

  var es9 = {};
  midi.inputs.forEach(function(value, key, map) {
    if (value.name === 'ES-9 MIDI In') {
      es9.inputID = value.id
      return
    }
  });
  midi.outputs.forEach(function(value, key, map) {
    if (value.name === 'ES-9 MIDI Out') {
      es9.outputID = value.id
      return
    }
  });

  ReactDOM.render(
    <React.StrictMode>
      <Status midi={midi} message={statusMsg} />
      <Logs midi={midi} es9={es9} />
      <Mixer />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

function onMIDISuccess(midiAccess) {
  render(midiAccess, 'OK');
}

function onMIDIFailure(msg) {
  render(null, msg);
}

if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
    sysex: true
  }).then(
    onMIDISuccess,
    onMIDIFailure
  );
} else {
  render(null, 'No MIDI support in your browser.');
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
