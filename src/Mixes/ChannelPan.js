import React from 'react';
import {
  Slider,
} from '@material-ui/core';

class ChannelPan extends React.Component {

  updatePan(e, pan) {
    this.props.updatePan(this.props.number, pan);
  }

  render() {

    if (this.props.disable) {
      return (<></>)
    }

    return (
      <div className="ChannelPan">
        <div className="slider">
          <Slider
            color="secondary"
            valueLabelDisplay="auto"
            track={false}
            value={this.props.pan}
            min={0}
            max={127}
            disabled={this.props.disable}
            onChange={this.updatePan.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default ChannelPan;
