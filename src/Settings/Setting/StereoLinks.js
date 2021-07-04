import React from 'react';
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid
} from '@material-ui/core';

class StereoLinks extends React.Component {

  render() {

    var stereoLinks = {};

    for (var group in this.props.stereoLinks) {
      stereoLinks[group] = this.props.stereoLinks[group].map(function(e, i) {
        return (
          <FormControlLabel
            key={i}
            control={
              <Checkbox
                checked={!!e}
                disabled
              />
            }
            label={`${i*2+1}/${i*2+2}`}
          />
        )
      });
    };

    return (
      <div className="StereoLinks">
        <div className="section">Stereo Links:</div>
        <FormGroup row>
          <Grid container>
            <Grid item xs={12}>
              {stereoLinks.input}
            </Grid>
            <Grid item xs={12}>
              {stereoLinks.bus}
            </Grid>
            <Grid item xs={12}>
              {stereoLinks.usb}
            </Grid>
            <Grid item xs={12}>
              {stereoLinks.mix}
            </Grid>
          </Grid>
        </FormGroup>
      </div>
    )
  }
}

export default StereoLinks;
