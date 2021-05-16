class Version {

  static id = 0x32;

  constructor(data) {
    this.version = String.fromCharCode.apply(null, data.slice(6, -1));
  }

  output() {
    return this.version;
  }
}

export default Version;
