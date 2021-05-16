class Version {

  static id = 0x32;

  static parse(data) {
    var version = String.fromCharCode.apply(null, data.slice(6, -1));
    return version
  }
}

export default Version;
