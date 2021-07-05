import React from 'react';
import { Grid } from '@material-ui/core';
import Mix from './Mix';
import './Mixes.css';

class Mixes extends React.Component {

  render() {

    var mixes = this.props.mixes?.map(function(e, i) {
      return (
        <Grid item key={i}
           style={{ display: this.props.settings.showMixes[i] ? 'block' : 'none' }}
        >
          <Mix
            number={i}
            channels={e}
            updateVolume={this.props.updateVolume}
            stereoLinks={this.props.stereoLinks}
            routeIn={this.props.routeIn}
          />
        </Grid>
      )
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
