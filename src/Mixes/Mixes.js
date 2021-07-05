import React from 'react';
import { Grid } from '@material-ui/core';
import Mix from './Mix';
import './Mixes.css';

class Mixes extends React.Component {

  render() {

    var mixes = this.props.mixes?.map(function(e, i) {

      var linked = false;
      if (i % 2 === 0) {
        linked = !!this.props.stereoLinks?.mix[i/2];
      }

      if (this.props.settings.showMixes[i]) {
        return (
          <Grid item key={i}>
            <Mix
              number={i}
              channels={e}
              updateVolume={this.props.updateVolume}
              stereoLinks={this.props.stereoLinks}
              routeIn={this.props.routeIn}
              routeOut={this.props.routeOut}
              linked={linked}
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
