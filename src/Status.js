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
        </header>
      </div>
    );
  }
}

export default Status;
