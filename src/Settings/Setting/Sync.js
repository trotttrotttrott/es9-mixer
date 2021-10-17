import React from 'react';
import {
  Button
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';

class Sync extends React.Component {

  render() {
    return (
      <div className="Sync">
        <div className="section">Sync with ES-9:</div>
        <p>Stereo links and routing may not be up to date if they've changed since
           this UI was loaded. Sync by requesting a config dump.</p>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          startIcon={<SyncIcon />}
          onClick={this.props.requestConfig}
        >
          Sync
        </Button>
      </div>
    )
  }
}

export default Sync;
