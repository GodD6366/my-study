new Promise(function(resolve) {
    resolve();
}).then(function() {
    console.log(1);
});
async function test1() {
    await test2();
    console.log(2);
}
async function test2() {
    return new Promise(resolve => {
        // setTimeout(() => {
        resolve();
        console.log(3);
        // }, 0);
    });
}
test1();
