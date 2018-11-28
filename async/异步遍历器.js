async function* gen1() {
    yield 'a';
    yield 'b';
    return 2;
}

async function* gen2() {
    const result = yield* gen1();
    console.log(`result -> ${result}`);
}

// 异步遍历器
// next() 方法返回一个promise
let thenGen = gen2();
thenGen
    .next()
    .then(({ value }) => {
        console.log(`then -> ${value}`);
        return thenGen.next();
    })
    .then(({ value }) => {
        console.log(`then -> ${value}`);
        return thenGen.next();
    });

(async () => {
    let awaitGen = gen2();
    console.log(await awaitGen.next());
    console.log(await awaitGen.next());
    console.log(await awaitGen.next());
})();

// for循环遍历异步生成器
(async function f() {
    for await (const x of gen2()) {
        console.log(x);
    }
})();
