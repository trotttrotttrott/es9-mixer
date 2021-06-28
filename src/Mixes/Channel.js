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
        {
          !this.props.disable &&
            <ButtonGroup
              orientation="vertical"
              color="secondary"
              variant="text"
            >
              <Button onClick={this.updateVolume.bind(this, null, 127)}>.....</Button>
              <Button onClick={this.updateVolume.bind(this, null, 96)}>....</Button>
              <Button onClick={this.updateVolume.bind(this, null, 63)}>...</Button>
              <Button onClick={this.updateVolume.bind(this, null, 31)}>..</Button>
              <Button onClick={this.updateVolume.bind(this, null, 0)}>.</Button>
            </ButtonGroup>
        }
      </div>
    )
  }
}

export default Channel;
