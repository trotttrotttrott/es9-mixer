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

      var input = this.props.routeIn?.mix[i];
      var routeIn = ES9Static.routeIn[input];
      var linked = this.props.stereoLinks[routeIn.type][routeIn.linkIndex];

      if (linked && i % 2 === 1) {
        return
      }

      return (
        <Grid item key={i + 1}>
          <Channel
            name={linked ? `${i+1}/${i+2}` : i+1}
            number={i+1}
            volume={e.volume}
            updateVolume={this.updateVolume.bind(this)}
          />
        </Grid>
      );
    }.bind(this));

    return (
      <div className="Mix">
        <div className="name">Mix {this.props.number + 1}</div>
        <Grid container spacing={2}>
          {channels}
        </Grid>
      </div>
    )
  }
}

export default Mix;
