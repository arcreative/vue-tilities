import installFilters from './extensions/install-filters'

import MomentUtils from './utils/moment-utils'
import StringUtils from './utils/string-utils'

export default {
  version: '__VERSION__',

  install (Vue, options = {}) {
    installFilters(
      Vue,
      options.stringUtils || new StringUtils(),
      options.momentUtils
    );
  }
};

export {
  StringUtils,
  MomentUtils
}
