import React from 'react';
import './Status.css';

class Status extends React.Component {

  constructor(props) {
    super(props);
    this.midiSupport = !!props.midi
  }

  render() {
    return (
      <div className="Status">
        <header>
          <div>
            <span>Web MIDI status: </span>
            <span className={String(this.midiSupport)}>{this.props.message}</span>
          </div>
        </header>
      </div>
    );
  }
}

export default Status;
