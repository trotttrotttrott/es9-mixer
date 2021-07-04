class MixDump {

  static id = 0x11;

  static type = 'MixDump';

  constructor(data) {
    var c = 390;
    this.mixes = Array(16).fill(0).map(function(_, mix) {
      return Array(8).fill(0).map(function(_, channel) {
        var mix = {
          volume: data[c],
        };
        c += 2;
        return mix;
      });
    });
  }
}

export default MixDump;
