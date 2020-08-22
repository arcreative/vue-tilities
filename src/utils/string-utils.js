// Lodash .get replacement from https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
const get = (obj, path, defaultValue = undefined) => {
  const travel = regexp =>
      String.prototype.split
          .call(path, regexp)
          .filter(Boolean)
          .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

class StringUtils {

  constructor(options = {}) {
    this._humanizeMap = options.humanize || {};
    this._shortenMap = options.shorten || {};
    this._replacements = options.replacements || {};
  }

  get(object, path, fallback = '') {
    return get(object, path, fallback);
  }

  dasherize(string) {
    string = (string || '') + '';
    return string
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .replace(/\s[\s]+/g, ' ')
    .replace(/\s/g, '-');
  }

  humanize(string, title = false) {
    string = (string || '') + '';

    if (this. _humanizeMap[string]) {
      return this. _humanizeMap[string];
    }

    string = this.underscore(string, ' ');
    string = title ? string.split(' ').map(this.ucfirst).join(' ') : this.ucfirst(string);
    for (var search in this._replacements) {
      if (this._replacements.hasOwnProperty(search)) {
        string = string.replace(search, this._replacements[search]);
      }
    }
    return string;
  }

  singularize(string) {
    string = (string || '') + '';
    if(string.slice(-1) === 's') { return string.slice(0,-1)}
  }

  titleize(string) {
    string = (string || '') + '';
    return this.humanize(string, true);
  }

  ucfirst(string) {
    string = (string || '') + '';
    return string.slice(0, 1).toUpperCase() + string.slice(1);
  }

  shorten(string) {
    string = (string || '') + '';
    return this._shortenMap[string] ? this._shortenMap[string] : string;
  }

  underscore(string, delimiter) {
    string = (string || '') + '';
    delimiter = delimiter || '_';
    return string
    .replace(/([a-z0-9])([A-Z0-9])/g, '$1_$2')
    .replace(/([0-9])([A-Z])/g, '$1_$2')
    .replace(/_/g, delimiter)
    .toLowerCase();
  }

  removeUnderscore(string) {
    string = (string || '') + '';
    return string.replace(/_/g, ' ');
  }
}

export default StringUtils;
