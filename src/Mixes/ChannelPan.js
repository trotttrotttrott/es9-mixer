import React from 'react';
import {
  Slider,
} from '@material-ui/core';

class ChannelPan extends React.Component {

  updatePan(e, pan) {
    this.props.updatePan(this.props.number, pan + 64);
  }

  resetPan(e) {
    this.props.updatePan(this.props.number, 64);
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
            marks={[{value: 0}]}
            value={this.props.pan - 63}
            min={-63}
            max={63}
            disabled={this.props.disable}
            onChange={this.updatePan.bind(this)}
            onDoubleClick={this.resetPan.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default ChannelPan;
