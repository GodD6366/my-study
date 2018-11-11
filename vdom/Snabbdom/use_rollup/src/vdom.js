import * as snabbdom from 'snabbdom/es/snabbdom';
import _attributes from 'snabbdom/es/modules/attributes';
import _class from 'snabbdom/es/modules/class';
import _props from 'snabbdom/es/modules/props';
import _style from 'snabbdom/es/modules/style';
import _dataset from 'snabbdom/es/modules/dataset';
import _hero from 'snabbdom/es/modules/hero';
import _eventlisteners from 'snabbdom/es/modules/eventlisteners';

export const patch = snabbdom.init([
    _attributes,
    _class,
    _props,
    _style,
    _dataset,
    _hero,
    _eventlisteners
]);

import _h from 'snabbdom/es/h';

/**
 * FIXME h函数 第二个参数必须传递,否则报错的问题
 * @param  {...any} args
 */
export const h = (...args) => {
    args[1] = args[1] ? args[1] : {};
    return _h.apply(this, args);
};