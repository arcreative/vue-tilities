'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var get = _interopDefault(require('lodash-es/get'));

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
    return string.toLowerCase().replace(/[^a-z\s]/g, ' ').replace(/\s[\s]+/g, ' ').replace(/\s/g, '-');
  }

  humanize(string) {
    string = (string || '') + '';

    if (this._humanizeMap[string]) {
      return this._humanizeMap[string];
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

    if (string.slice(-1) === 's') {
      return string.slice(0, -1);
    }
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
    return string.replace(/([a-z0-9])([A-Z0-9])/g, '$1_$2').replace(/([0-9])([A-Z])/g, '$1_$2').replace(/_/g, delimiter).toLowerCase();
  }

  removeUnderscore(string) {
    string = (string || '') + '';
    return string.replace(/_/g, ' ');
  }

}

class MomentUtils {
  constructor(moment) {
    if (!moment) {
      throw new Error('Please pass your localized version of moment to DateTimeUtils');
    }

    this._moment = moment;
  }

  date(date, format = 'll') {
    return this._moment(date).format(format);
  }

  time(date, format = 'LT') {
    return this.date(date, format);
  }

  datetime(date, format = 'LLL') {
    return this.date(date, format);
  }

}

var installFilters = ((Vue, stringUtils, momentUtils = null) => {
  Vue.prototype.$utils = Vue.prototype.$utils || {}; // String utils

  Object.getOwnPropertyNames(StringUtils.prototype).forEach(method => {
    if (method === 'constructor') return;
    Vue.filter(method, stringUtils[method].bind(stringUtils));
  });
  Vue.prototype.$utils.string = stringUtils; // Moment.js utils

  if (momentUtils) {
    Object.getOwnPropertyNames(MomentUtils.prototype).forEach(method => {
      if (method === 'constructor') return;
      Vue.filter(method, momentUtils[method].bind(momentUtils));
    });
  }
});

var index_esm = {
  version: '0.1.0',

  install(Vue, options = {}) {
    installFilters(Vue, options.stringUtils || new StringUtils(), options.momentUtils);
  }

};

exports.default = index_esm;
exports.StringUtils = StringUtils;
exports.MomentUtils = MomentUtils;
