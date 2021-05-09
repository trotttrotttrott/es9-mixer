import React from 'react';
import './Status.css';

class Status extends React.Component {

  constructor(props) {
    super(props);
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess ({
        sysex: true
      })
      this.message = 'OK';
      this.midiSupport = true;
    } else {
      this.message = 'No MIDI support in your browser.';
      this.midiSupport = false;
    }
  }

  render() {
    return (
      <div className="Status">
        <header>
          <div>
            <span>Web MIDI status: </span>
            <span className={String(this.midiSupport)}>{this.message}</span>
          </div>
          <div>This version is for ES-9 firmware v1.2.0 and above.</div>
        </header>
      </div>
    );
  }
}

export default Status;
