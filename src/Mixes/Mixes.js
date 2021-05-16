import React from 'react';
import { Grid } from '@material-ui/core';
import Mix from './Mix';
import './Mixes.css';

class Mixes extends React.Component {

  render() {

    var mixes = this.props.mixes?.map(function(e, i) {

      if (this.props.hideMixes.includes(i + 1)) {
        return '';
      } else {
        return (
          <Grid item key={i} xs={3}>
            <Mix
              number={i}
              channels={e}
              disableChannels={this.props.disableChannels[i + 1] || []}
              updateVolume={this.props.updateVolume}
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
