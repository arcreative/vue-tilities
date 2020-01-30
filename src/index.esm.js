import installFilters from './extensions/install-filters'

import StringUtils from './utils/string-utils'
import MomentUtils from './utils/moment-utils'
import NumeralUtils from './utils/numeral-utils'

export default {
  version: '__VERSION__',

  install (Vue, options = {}) {
    installFilters(
      Vue,
      options.stringUtils || new StringUtils(),
      options.momentUtils,
      options.numeralUtils
    );
  }
};

export {
  StringUtils,
  MomentUtils,
  NumeralUtils
}
