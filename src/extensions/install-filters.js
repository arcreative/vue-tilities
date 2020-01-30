import StringUtils from '../utils/string-utils'
import MomentUtils from '../utils/moment-utils'
import NumeralUtils from '../utils/numeral-utils'

export default (Vue, stringUtils, momentUtils = null, numeralUtils = null) => {
  Vue.prototype.$utils = Vue.prototype.$utils || {};

  // String utils
  Object.getOwnPropertyNames(StringUtils.prototype).forEach((method) => {
    if (method === 'constructor') return;
    Vue.filter(method, stringUtils[method].bind(stringUtils));
  });
  Vue.prototype.$utils.string = stringUtils;

  // Moment.js utils
  if (momentUtils) {
    Object.getOwnPropertyNames(MomentUtils.prototype).forEach((method) => {
      if (method === 'constructor') return;
      Vue.filter(method, momentUtils[method].bind(momentUtils));
    });
    Vue.prototype.$utils.moment = momentUtils._moment;
  }

  // Numeral.js utils
  if (numeralUtils) {
    Object.getOwnPropertyNames(NumeralUtils.prototype).forEach((method) => {
      if (method === 'constructor') return;
      Vue.filter(method, numeralUtils[method].bind(numeralUtils));
    });
    Vue.prototype.$utils.numeral = numeralUtils._numeral;
  }
}
