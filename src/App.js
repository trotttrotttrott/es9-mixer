import React from 'react';
import Status from './Status';
import Logs from './Logs';
import Mixer from './Mixer';

class App extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      info: `This version is for ES-9 firmware v1.2.0 and above.

ES-9 MIDI input ID: ${props.es9.inputID}
ES-9 MIDI output ID: ${props.es9.outputID}

`,
      rx: 'Received Messages:\n',
      tx: 'Transmitted Messages:\n'
    };
  }

  info(data) {
    var time = new Date().toLocaleTimeString();
    this.setState({
      info: `${this.state.info}${time}: ${data}\n`
    });
  }

  rx(data) {
    this.setState({
      rx: `${this.state.rx}${data}\n`
    });
  }

  tx(data) {
    this.setState({
      tx: `${this.state.tx}${data}\n`
    });
  }

  render() {

    const log = { info: this.info.bind(this), rx: this.rx.bind(this), tx: this.tx.bind(this) }
    const logs = { info: this.state.info, rx: this.state.rx, tx: this.state.tx }

    return (
      <>
        <Status
          midi={this.props.midi}
          message={this.props.statusMsg}
        />
        <Logs
          midi={this.props.midi}
          es9={this.props.es9}
          log={log}
          logs={logs}
        />
        <Mixer
          midi={this.props.midi}
          es9={this.props.es9}
          log={log}
        />
      </>
    )
  }
}

export default App;
