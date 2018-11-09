const { h, patch } = require('./vdom');
const $app = document.querySelector('#app');

function normalTest() {
    function render(list = []) {
        return h(
            'ul',
            {
                hook: {
                    insert() {
                        console.log('InsertHook 2');
                    }
                }
            },
            list.map((i, idx) => {
                return h('li', { key: idx }, i);
            })
        );
    }

    var vnode = render([1, 2, 3]);

    patch($app, vnode);

    setTimeout(() => {
        patch(vnode, render([11, 2, 33]));
    }, 1000);
}

normalTest();
// jsx test
require('./jsx')();
