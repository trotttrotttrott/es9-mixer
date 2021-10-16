import React from 'react';
import './Status.css';

class Status extends React.Component {

  render() {
    return (
      <>
        {
          !this.props.midiSupport &&
          <div className="Status">
            <header>
              <div>
                <span className={String(this.props.midiSupport)}>{this.props.message}</span>
              </div>
            </header>
          </div>
        }
      </>
    );
  }
}

export default Status;
