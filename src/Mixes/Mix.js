import React from 'react';
import ES9Static from '../ES9Static';
import { Grid } from '@material-ui/core';
import Channel from './Channel';
import './Mix.css';

class Mix extends React.Component {

  updateVolume(channel, volume) {
    this.props.updateVolume(this.props.number, channel, volume);
  }

  render() {

    var channels = this.props.channels.map(function(e, i) {

      var routeIndex;
      if (this.props.number < 8) {
        routeIndex = i;
      } else {
        routeIndex = i + 8;
      }

      var input = this.props.routeIn?.mix[routeIndex];
      var routeIn = ES9Static.routeIn[input];
      var linked = this.props.stereoLinks[routeIn.type][routeIn.linkIndex];

      if (linked && i % 2 === 1) {
        return
      }

      var name = routeIn.name.split(' ').pop();
      if (linked) {
        name += '/';
        name += ES9Static.routeIn[input+1].name.split(' ').pop();
      }

      return (
        <Grid item key={i + 1}>
          <Channel
            name={name}
            number={i+1}
            volume={e.volume}
            updateVolume={this.updateVolume.bind(this)}
            disable={this.props.secondaryLink}
          />
        </Grid>
      );
    }.bind(this));

    var outputName = `(controlled by mix ${this.props.number})`;
    if (!this.props.secondaryLink) {
      var output1 = this.props.routeOut?.mix[this.props.number];
      var routeOut1 = ES9Static.routeOut[output1];
      outputName = routeOut1.name
      if (this.props.primaryLink) {
        var output2 = this.props.routeOut?.mix[this.props.number+1];
        var routeOut2 = ES9Static.routeOut[output2];
        outputName = `${routeOut1.name} / ${routeOut2.name}`
      }
    }

    return (
      <div className="Mix">
        <div className="name">
          <span>Mix {this.props.number + 1}</span>
          <span>.</span>
          <span>{outputName}</span>
        </div>
        <Grid container spacing={2}>
          {channels}
        </Grid>
      </div>
    )
  }
}

export default Mix;
