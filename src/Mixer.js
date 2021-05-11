import React from 'react';
import { Grid } from '@material-ui/core';
import Channel from './Channel';
import './Mixer.css';

class Mixer extends React.Component {

  render() {

    var inputs = Array(14).fill(0).map((_, i) =>
      <Grid item key={i + 1}>
        <Channel
          number={i + 1}
          es9={this.props.es9}
          log={this.props.log}
        />
      </Grid>
    );

    return (
      <div className="Mixer">
        <Grid container spacing={2}>
          {inputs}
        </Grid>
      </div>
    )
  }
}

export default Mixer;
