import React from 'react';
import ShowMixes from './Setting/ShowMixes';
import './Settings.css'
import {
  Accordion,
  AccordionSummary,
  AccordionDetails
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
          <ShowMixes
            mixes={this.props.mixes}
            showMixes={this.props.settings?.showMixes}
            showMix={this.props.showMix}
          />
        </AccordionDetails>
      </Accordion>
    )
  }
}

export default Settings;
