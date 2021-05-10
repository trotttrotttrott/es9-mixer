import React from 'react';
import { Grid } from '@material-ui/core';
import Channel from './Channel';
import './Mixer.css';

class Mixer extends React.Component {

  render() {

    var inputs = Array(14).fill(0).map((_, i) =>
      <Grid item>
        <Channel name={`Input ${i+1}`} number={i + 1}  />
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
