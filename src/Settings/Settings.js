import React from 'react';
import ShowMixes from './Setting/ShowMixes';
import Routing from './Setting/Routing';
import StereoLinks from './Setting/StereoLinks';
import Sync from './Setting/Sync';
import './Settings.css'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';

class Settings extends React.Component {

  render() {
    return (
      <Accordion className="Settings">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color='primary' />}
        >
          <SettingsIcon />
          <span>Settings</span>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ShowMixes
                mixes={this.props.mixes}
                showMixes={this.props.settings?.showMixes}
                showMix={this.props.showMix}
              />
            </Grid>
            <Grid item xs={12}>
              <Routing
                routeIn={this.props.routeIn}
                routeOut={this.props.routeOut}
              />
            </Grid>
            <Grid item xs={12}>
              <StereoLinks
                stereoLinks={this.props.stereoLinks}
              />
            </Grid>
            <Grid item xs={12}>
              <Sync
                requestConfig={this.props.requestConfig}
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <div className="section version">Firmware Version: {this.props.version}</div>
              </div>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    )
  }
}

export default Settings;
