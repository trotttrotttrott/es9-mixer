import React from 'react';
import './MIDI.css'
import {
  Grid,
  TextareaAutosize,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import ConfigDump from './Message/ConfigDump'
import MixDump from './Message/MixDump'
import SampleRate from './Message/SampleRate'
import Usage from './Message/Usage'
import Version from './Message/Version'

class MIDI extends React.Component {

  constructor(props) {
    super(props)

    this.types = {};
    this.types[ConfigDump.id] = ConfigDump;
    this.types[MixDump.id] = MixDump;
    this.types[SampleRate.id] = SampleRate;
    this.types[Usage.id] = Usage;
    this.types[Version.id] = Version;

    this.logRef = React.createRef();
    this.rxRef = React.createRef();

    props.es9.input.onmidimessage = this.onMIDIMessage.bind(this);
  }

  componentDidMount() {
    this.props.requestVersion();
    this.props.requestConfig();
    this.props.requestMix();
  }

  componentDidUpdate() {
    this.logRef.current.scrollTop = this.logRef.current.scrollHeight;
    this.rxRef.current.scrollTop = this.rxRef.current.scrollHeight;
  }

  onMIDIMessage(message) {
    this.props.midiInfo(`Received sysex (${message.data.length} bytes)`);
    var type = this.types[message.data[5]];

    if (type === undefined) {
      this.props.midiRx(message.data);
      return;
    }

    this.props.midiRx(`${type.type} received.`);
    var instance = new type(message.data);
    if (!!instance.output) {
      this.props.midiRx(instance.output());
    }
    if (!!instance.mixes) {
      this.props.setMixes(instance.mixes);
    }
    if (!!instance.version) {
      this.props.setVersion(instance.version);
    }
    if (!!instance.routeIn) {
      this.props.setRouteIn(instance.routeIn);
    }
    if (!!instance.routeOut) {
      this.props.setRouteOut(instance.routeOut);
    }
    if (!!instance.stereoLinks) {
      this.props.setStereoLinks(instance.stereoLinks);
    }
  }

  render() {
    return (
      <Accordion className="MIDI">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color='primary' />}
        >
          <FormatListBulletedIcon />
          <span>MIDI Activity</span>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextareaAutosize
                readOnly
                ref={this.logRef}
                value={this.props.midi.info}
                minRows={10}
                maxRows={10}
              />
            </Grid>
            <Grid item xs={6}>
              <TextareaAutosize
                readOnly
                ref={this.rxRef}
                value={this.props.midi.rx}
                minRows={10}
                maxRows={10}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    )
  }
}

export default MIDI;
