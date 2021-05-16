import React from 'react';
import Mix from './Mix';

class Mixes extends React.Component {

  render() {

    var mixes = this.props.mixes?.map(function(e, i) {
      return (
        <Mix
          key={i}
          number={i}
          channels={e}
        />
      )
    });

    return (
      <div className="Mixes">
        {mixes}
      </div>
    )
  }
}

export default Mixes;
