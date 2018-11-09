const { h, patch } = require('./vdom');

function jsxTest() {
    const $app = document.querySelector('#jsxTest');

    function render(list = []) {
        return (
            <ul>
                {list.map((i, idx) => (
                    <li key={idx}>{i}</li>
                ))}
            </ul>
        );
    }
    var vnode = render([1, 2, 3]);

    patch($app, vnode);

    setTimeout(() => {
        patch(vnode, render([11, 2, 33]));
    }, 1000);
}

module.exports = jsxTest;
