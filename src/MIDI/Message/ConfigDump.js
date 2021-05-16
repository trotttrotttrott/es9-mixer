class ConfigDump {

  static id = 0x10;

  constructor(data) {
    // We're only concerned with mix data.
    var start = 75;
    this.mix = Array(128).fill(0).map(function(_, i) {
      return {
        volume: data[start + i * 3],
        mix: i >> 3,
        channel: i & 7
      };
    })
  }
}

export default ConfigDump;
