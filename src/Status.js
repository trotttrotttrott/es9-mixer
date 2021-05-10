import React from 'react';
import './Status.css';

class Status extends React.Component {

  constructor(props) {
    super(props);
    this.message = props.message;
    if (props.midi) {
      this.midiSupport = true;
    } else {
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
          <div>MIDI input ID: {this.props.es9.inputID}</div>
          <div>MIDI output ID: {this.props.es9.outputID}</div>
        </header>
      </div>
    );
  }
}

export default Status;
