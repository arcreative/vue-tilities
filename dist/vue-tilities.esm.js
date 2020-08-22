// Lodash .get replacement from https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
const get = (obj, path, defaultValue = undefined) => {
  const travel = regexp => String.prototype.split.call(path, regexp).filter(Boolean).reduce((res, key) => res !== null && res !== undefined ? res[key] : res, obj);

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
    return string.toLowerCase().replace(/[^a-z\s]/g, ' ').replace(/\s[\s]+/g, ' ').replace(/\s/g, '-');
  }

  humanize(string, title = false) {
    string = (string || '') + '';

    if (this._humanizeMap[string]) {
      return this._humanizeMap[string];
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

    if (string.slice(-1) === 's') {
      return string.slice(0, -1);
    }
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
      throw new Error('Please pass your localized version of moment to MomentUtils');
    }

    this._moment = moment;
  }

  validate_date(date) {
    if (!this._moment(date).isValid()) {
      throw new Error(`Date: ${date} is not valid.`);
    }
  }

  date(date, format = 'll') {
    if (!date) return '';
    this.validate_date(date);
    return this._moment(date).format(format);
  }

  time(date, format = 'LT') {
    return this.date(date, format);
  }

  datetime(date, format = 'LLL') {
    return this.date(date, format);
  }

}

class NumeralUtils {
  constructor(numeral) {
    if (!numeral) {
      throw new Error('Please pass your localized version of numeral to NumeralUtils');
    }

    this._numeral = numeral;
  }

  validate_number(number) {
    if (isNaN(this._numeral(number).value())) {
      throw new Error(`Number: ${number} is not valid.`);
    }
  }

  number(number, format = '0,0[.]00', fallback = '') {
    if (number === null || typeof number === 'undefined') return fallback;
    this.validate_number(number);
    return this._numeral(number).format(format);
  }

}

var installFilters = ((Vue, stringUtils, momentUtils = null, numeralUtils = null) => {
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
    Vue.prototype.$utils.moment = momentUtils._moment;
  } // Numeral.js utils


  if (numeralUtils) {
    Object.getOwnPropertyNames(NumeralUtils.prototype).forEach(method => {
      if (method === 'constructor') return;
      Vue.filter(method, numeralUtils[method].bind(numeralUtils));
    });
    Vue.prototype.$utils.numeral = numeralUtils._numeral;
  }
});

var index_esm = {
  version: '0.5.1',

  install(Vue, options = {}) {
    installFilters(Vue, options.stringUtils || new StringUtils(), options.momentUtils, options.numeralUtils);
  }

};

export default index_esm;
export { MomentUtils, NumeralUtils, StringUtils };
