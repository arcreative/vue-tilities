import StringUtils from '../utils/string-utils'

export default (Vue, stringUtils) => {
  Object.getOwnPropertyNames(StringUtils.prototype).forEach((method) => {
    if (method === 'constructor') return;
    Vue.filter(method, stringUtils[method].bind(stringUtils));
  });

  Vue.prototype.$utils = Vue.prototype.$utils || {};
  Vue.prototype.$utils.string = stringUtils;
}
