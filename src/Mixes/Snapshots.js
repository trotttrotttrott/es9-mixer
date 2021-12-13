import React from 'react';
import {
  IconButton,
  Button
} from '@mui/material';
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';

class Snapshots extends React.Component {

  applySnapshot(snapshot) {
    this.props.applySnapshot(snapshot);
  }

  deleteSnapshot(snapshot) {
    this.props.deleteSnapshot(snapshot);
  }

  render() {

    var snapshots = this.props.snapshots?.map(function(e, i) {
      return (
        <span key={i}>
          <Button
            variant="outlined"
            size="small"
            onClick={this.applySnapshot.bind(this, i)}
          >{String.fromCharCode(97+i)}</Button>
          <Button
            variant="text"
            size="small"
            onClick={this.deleteSnapshot.bind(this, i)}
          >x</Button>
        </span>
      )
    }.bind(this));

    return (
      <div className="Snapshots">
        <IconButton
          color="primary"
          size="small"
          onClick={this.props.takeSnapshot}
        >
          <PhotoCameraOutlinedIcon />
        </IconButton>
        {snapshots}
      </div>
    )
  }
}

export default Snapshots;
