class ConfigDump {

  static id = 0x08;

  static type = 'ConfigDump';

  constructor(wdata) {
    let count = ( wdata.length - 8 - 1 ) / 3;
    let data = [];
    let index = 8;
    for ( let i=0; i<count; ++i ) {
      let w2 = wdata[ index++ ];
      let w1 = wdata[ index++ ];
      let w0 = wdata[ index++ ];
      data.push( ( w2 << 14 ) | ( w1 << 7 ) | w0 );
    }
    this.routeIn(data);
    this.routeOut(data);
    this.stereoLinks(data);
  }

  routeIn(data) {

    const inputCaptureLookup = [0x78, 0x79, 0x76, 0x75, 0x74, 0x7b, 0x7a, 0x77, 0x73, 0x72, 0x7d, 0x7c, 0x7e, 0x7f];

    var routeIn = [];

    var dsp, ch;
    for ( dsp=0; dsp<4; ++dsp ) {
      for ( ch=0; ch<8; ++ch ) {
        var v = data[2+dsp*8+ch];
        if ( ( v >> 4 ) === 7 ) {
          v = 0x70 + inputCaptureLookup.indexOf( v );
        }
        routeIn.push(v);
      }
    }
    this.routeIn = {
      usb: routeIn.slice(0, 16),
      mix: routeIn.slice(16, 32)
    };
  }

  routeOut(data) {

    var routeOut = [];

    var dsp, ch;
    for ( dsp=0; dsp<4; ++dsp ) {
      for ( ch=0; ch<8; ++ch ) {
        routeOut.push(data[2+32+dsp*8+ch]);
      }
    }
    this.routeOut = {
      usb: routeOut.slice(0, 16),
      mix: routeOut.slice(16, 32)
    };
  }

  stereoLinks(data) {

    // 0-6, 8-15, etc. correspond to the link numbers that can be used to
    // update stereo links. They're not relevant at this time since we don't
    // attempt to manage them.
    var input = []; // 0-6
    var bus = []; // 8-15
    var usb = []; // 16-23
    var mix = []; // 24-31

    var links0 = data[451];
    var links1 = data[452];

    var links = ( links1 << 16 ) | links0;

    for ( let i=0; i<7; ++i ) {
      input[i] = ( links >> i ) & 1;
    }
    for ( let i=0; i<8; ++i ) {
      bus[i] = ( links >> (8+i) ) & 1;
    }
    for ( let i=0; i<4; ++i ) {
      usb[i] = ( links >> (16+i) ) & 1;
      usb[i+4] = ( links >> (20+i) ) & 1;
      mix[i] = ( links >> (24+i) ) & 1;
      mix[i+4] = ( links >> (28+i) ) & 1;
    }
    this.stereoLinks = {
      input: input,
      bus: bus,
      usb: usb,
      mix: mix
    };
  }
}

export default ConfigDump;
