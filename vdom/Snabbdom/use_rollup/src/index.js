import { h, patch } from './vdom';
import jsxTest from './jsx';

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
                },
                dataset: {
                    name: '11'
                },
                hero: {
                    id: 1111
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
jsxTest();