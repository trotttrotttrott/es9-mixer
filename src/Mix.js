import React from 'react';
import { Grid } from '@material-ui/core';
import Channel from './Channel';
import './Mix.css';

class Mix extends React.Component {

  render() {

    var channels = this.props.channels.map(function(e, i) {
      return (
        <Grid item key={i + 1}>
          <Channel
            number={i + 1}
            volume={e.volume}
            disable={this.props.disableChannels.includes(i + 1)}
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
