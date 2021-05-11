import React from 'react';
import { Slider } from '@material-ui/core';
import './Channel.css';

class Channel extends React.Component {

  constructor(props) {
    super(props);
    if (props.number < 5) {
      this.mainMix = 0;
      this.phonesMix = 2;
      this.es9Channel = props.number + 3;
    } else {
      this.mainMix = 8;
      this.phonesMix = 10;
      this.es9Channel = props.number === 14 ? 7 : props.number - 5;
    }
  }

  handleChange(e, val) {
    var output = this.props.midi.outputs.get(this.props.es9.outputID);
    [this.mainMix, this.phonesMix].forEach(function(mix) {
      var arr = [ 0xF0, 0x00, 0x21, 0x27, 0x19, 0x34, mix * 8 + this.es9Channel, val, 0xF7 ];
      this.props.log.tx(arr);
      output.send(arr);
    }.bind(this));
  }

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
          onChange={this.handleChange.bind(this)}
        />
        <div className="channel-name">
          Input {this.props.number}
        </div>
      </div>
    )
  }
}

export default Channel;
