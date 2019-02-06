import get from 'lodash-es/get'

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

  humanize(string) {
    string = (string || '') + '';

    if (this. _humanizeMap[string]) {
      return this. _humanizeMap[string];
    }

    string = this.underscore(string, ' ');
    string = this.ucfirst(string);
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

  title(string) {
    string = (string || '') + '';
    return this.ucfirst(string.toLowerCase());
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
