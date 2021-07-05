import React from 'react';
import {
  Slider,
  Button,
  ButtonGroup
} from '@material-ui/core';
import './Channel.css';

class Channel extends React.Component {

  updateVolume(e, volume) {
    this.props.updateVolume(this.props.number, volume);
  }

  bumpVolume(e, amount) {
    var volume = this.props.volume + amount;
    if (volume > 127) {
      volume = 127;
    } else if (volume < 0) {
      volume = 0;
    }
    this.updateVolume(e, volume);
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
          {this.props.name}
        </div>
        {
          !this.props.disable &&
          <>
            <div>
              <ButtonGroup
                orientation="vertical"
                color="secondary"
                variant="text"
              >
                <Button onClick={this.bumpVolume.bind(this, null, 5)}>+</Button>
                <Button onClick={this.bumpVolume.bind(this, null, -5)}>-</Button>
              </ButtonGroup>
            </div>
            <div>.</div>
            <div>
              <ButtonGroup
                orientation="vertical"
                color="secondary"
                variant="text"
              >
                <Button onClick={this.updateVolume.bind(this, null, 127)}>....</Button>
                <Button onClick={this.updateVolume.bind(this, null, 103)}>...</Button>
                <Button onClick={this.updateVolume.bind(this, null, 51)}>..</Button>
                <Button onClick={this.updateVolume.bind(this, null, 0)}>.</Button>
              </ButtonGroup>
            </div>
          </>
        }
      </div>
    )
  }
}

export default Channel;
