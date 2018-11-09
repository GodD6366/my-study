var snabbdom = require('snabbdom');
var patch = snabbdom.init([
    // Init patch function with chosen modules
    require('snabbdom/modules/attributes').default, // makes it easy to toggle classes
    require('snabbdom/modules/class').default, // makes it easy to toggle classes
    require('snabbdom/modules/props').default, // for setting properties on DOM elements
    require('snabbdom/modules/style').default, // handles styling on elements with support for animations
    require('snabbdom/modules/eventlisteners').default // attaches event listeners
]);
var h = require('snabbdom/h').default; // helper function for creating vnodes

/**
 * FIXME h函数 第二个参数必须传递,否则报错的问题
 * @param  {...any} args
 */
var proxyH = (...args) => {
    args[1] = args[1] ? args[1] : {};
    return h.apply(this, args);
};
module.exports = { h: proxyH, patch };
