class ConfigDump {

  static id = 0x10;

  static type = 'ConfigDump';

  constructor(data) {
    this.stereoLinks(data.slice(459, 459+31));
  }

  stereoLinks(data) {

    // 0-6
    var input = [];

    // 8-15
    var bus = [];

    // 16-23
    var usb = [];

    // 24-31
    var mix = [];

    var links0 = 0;
    var links1 = 0;

    var i;
    var c = 0;

    for ( i=0; i<4; ++i ) {
      links0 = ( links0 << 4 ) | data[c]; c++;
    }

    for ( i=0; i<4; ++i ) {
      links1 = ( links1 << 4 ) | data[c]; c++;
    }

    var links = ( links1 << 16 ) | links0;

    for ( i=0; i<7; ++i ) {
      input[i] = ( links >> i ) & 1;
    }

    for ( i=0; i<8; ++i ) {
      bus[i] = ( links >> (8+i) ) & 1;
    }

    for ( i=0; i<4; ++i ) {
      usb[i] = ( links >> (16+i) ) & 1;
      usb[i+4] = ( links >> (20+i) ) & 1;
      mix[i] = ( links >> (24+i) ) & 1;
      mix[i+4] = ( links >> (28+i) ) & 1;
    }
  }
}

export default ConfigDump;
