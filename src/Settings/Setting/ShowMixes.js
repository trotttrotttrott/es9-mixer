import React from 'react';
import {
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

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
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
            />
          }
          label={i+1}
        />
      )
    }.bind(this));

    return (
      <div className="ShowMixes">
        <div className="section">Show Mixes:</div>
        <FormGroup row>
          {mixes}
        </FormGroup>
      </div>
    )
  }
}

export default ShowMixes;
