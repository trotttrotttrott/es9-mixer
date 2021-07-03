import React from 'react';
import {
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import './ShowMixes.css';

class ShowMixes extends React.Component {

  showMix(mix, e) {
    this.props.showMix(mix, e.target.checked);
  }

  render() {

    var mixes = this.props.mixes?.map(function(e, i) {
      return (
        <FormControlLabel
          key={i}
          control={
            <Checkbox
              checked={this.props.showMixes[i]}
              onChange={this.showMix.bind(this, i)}
            />
          }
          label={i+1}
        />
      )
    }.bind(this));

    return (
      <div className="ShowMixes">
        <FormGroup row>
          <div className="section">Show Mixes:</div>
          {mixes}
        </FormGroup>
      </div>
    )
  }
}

export default ShowMixes;
