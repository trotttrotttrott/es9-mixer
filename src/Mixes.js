import React from 'react';
import Mix from './Mix';

class Mixes extends React.Component {

  render() {

    var mixes = this.props.mixes?.map(function(e, i) {

      if (this.props.hideMixes.includes(i + 1)) {
        return '';
      } else {
        return (
          <Mix
            key={i}
            number={i}
            channels={e}
            disableChannels={this.props.disableChannels[i + 1] || []}
            updateVolume={this.props.updateVolume}
          />
        )
      }
    }.bind(this));

    return (
      <div className="Mixes">
        {mixes}
      </div>
    )
  }
}

export default Mixes;
