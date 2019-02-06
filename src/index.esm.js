import installFilters from './extensions/install-filters'

import StringUtils from './utils/string-utils'

export default {
  version: '__VERSION__',

  install (Vue, options = {}) {
    installFilters(Vue, options.stringUtils || new StringUtils());
  }
};

export {
  StringUtils
}
