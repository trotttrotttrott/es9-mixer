import React from 'react';
import { Slider } from '@material-ui/core';
import './Channel.css';

class Channel extends React.Component {

  render() {
    return (
      <div className="Channel">
        <Slider
          orientation="vertical"
          color="secondary"
          valueLabelDisplay="auto"
          defaultValue={0}
          min={0}
          max={127}
          disabled={[12, 13].includes(this.props.number)}
        />
        <div className="channel-name">
          {this.props.name}
        </div>
      </div>
    )
  }
}

export default Channel;
