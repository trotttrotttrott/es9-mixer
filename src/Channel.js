import React from 'react';
import { Slider } from '@material-ui/core';
import './Channel.css';

class Channel extends React.Component {

  updateVolume(e, volume) {
    this.props.updateVolume(this.props.number, volume);
  }

  render() {
    return (
      <div className="Channel">
        <div className="slider">
          <Slider
            orientation="vertical"
            color="secondary"
            valueLabelDisplay="auto"
            value={this.props.volume}
            min={0}
            max={127}
            disabled={this.props.disable}
            onChange={this.updateVolume.bind(this)}
          />
        </div>
        <div className="channel-name">
          {this.props.number}
        </div>
      </div>
    )
  }
}

export default Channel;
