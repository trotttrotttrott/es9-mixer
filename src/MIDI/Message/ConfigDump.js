class ConfigDump {

  static id = 0x10;

  constructor(data) {
    // We're only concerned with mix data.
    var c = 75;
    this.mix = Array(16).fill(0).map(function(_, mix) {
      return Array(8).fill(0).map(function(_, channel) {
        var mix = {
          volume: data[c],
        };
        c += 3;
        return mix;
      });
    });
  }
}

export default ConfigDump;
