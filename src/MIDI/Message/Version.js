class Version {

  static id = 0x32;

  static type = 'Version';

  constructor(data) {
    this.version = String.fromCharCode.apply(null, data.slice(6, -1));
  }

  output() {
    return `Firmware version: ${this.version}`;
  }
}

export default Version;
