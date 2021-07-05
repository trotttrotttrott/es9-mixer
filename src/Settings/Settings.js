import React from 'react';
import ShowMixes from './Setting/ShowMixes';
import StereoLinks from './Setting/StereoLinks';
import Routing from './Setting/Routing';
import './Settings.css'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';

class Settings extends React.Component {

  render() {
    return (
      <Accordion className="Settings">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color='secondary' />}
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
              <StereoLinks
                stereoLinks={this.props.stereoLinks}
              />
            </Grid>
            <Grid item xs={12}>
              <Routing
                routeIn={this.props.routeIn}
                routeOut={this.props.routeOut}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    )
  }
}

export default Settings;
