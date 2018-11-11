import { h, patch } from './vdom';

function jsxTest() {
    const $app = document.querySelector('#jsxTest');

    function render(list = []) {
        return (
            <ul>
                {list.map((i, idx) => (
                    <li>{i}</li>
                    // <li key={idx}>{i}</li>
                ))}
            </ul>
        );
    }
    var vnode = render([
        Math.random() * 1000,
        Math.random() * 1000,
        Math.random() * 1000
    ]);

    patch($app, vnode);

    setInterval(() => {
        let arr = [];
        arr.length = parseInt(Math.random() * 10, 10) + 1;
        for (let index = 0; index < arr.length; index++) {
            arr[index] = Math.random() * 1000;
        }
        let newVnode = render(arr);
        patch(vnode, newVnode);
        vnode = newVnode;
    }, 2000);
}

export default jsxTest;
