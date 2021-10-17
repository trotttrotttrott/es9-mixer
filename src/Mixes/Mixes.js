import React from 'react';
import { Grid } from '@mui/material';
import Mix from './Mix';
import './Mixes.css';

class Mixes extends React.Component {

  render() {

    var mixes = this.props.mixes?.map(function(e, i) {

      var primaryLink = false;
      var secondaryLink = false;
      if (i % 2 === 0 && !!this.props.stereoLinks?.mix[i/2]) {
        // Mix is stereo linked...
        primaryLink = true;
      } else if (!!this.props.stereoLinks?.mix[(i-1)/2]) {
        // The previous mix is stereo linked so this one is a part of it.
        // ES-9 ignores messages for this mix.
        secondaryLink = true;
      }

      if (this.props.settings.showMixes[i]) {
        return (
          <Grid item key={i}>
            <Mix
              number={i}
              channels={e}
              updateVolume={this.props.updateVolume}
              updatePan={this.props.updatePan}
              stereoLinks={this.props.stereoLinks}
              routeIn={this.props.routeIn}
              routeOut={this.props.routeOut}
              primaryLink={primaryLink}
              secondaryLink={secondaryLink}
            />
          </Grid>
        )
      }
    }.bind(this));

    return (
      <div className="Mixes">
        <Grid container spacing={1}>
          {mixes}
        </Grid>
      </div>
    )
  }
}

export default Mixes;
