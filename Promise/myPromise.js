const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
const isFunction = fn => typeof fn === 'function';

class MyPromise {
    constructor(executor) {
        this.state = PENDING;
        // 成功的值
        this.value = undefined;
        // 失败的原因
        this.reason = undefined;

        // 成功存放的数组
        this.onResolvedCallbacks = [];
        // 失败存放法数组
        this.onRejectedCallbacks = [];

        let resolve = value => {
            setTimeout(() => {
                // state改变,resolve调用就会失败
                if (this.state === PENDING) {
                    // resolve调用后，state转化为成功态
                    this.state = FULFILLED;
                    // 储存成功的值
                    this.value = value;
                    // 一旦resolve执行，调用成功数组的函数
                    this.onResolvedCallbacks.forEach(fn => fn(this.value));
                }
            });
        };
        let reject = reason => {
            setTimeout(() => {
                // state改变,reject调用就会失败
                if (this.state === PENDING) {
                    // reject调用后，state转化为失败态
                    this.state = REJECTED;
                    // 储存失败的原因
                    this.reason = reason;
                    // 一旦reject执行，调用失败数组的函数
                    this.onRejectedCallbacks.forEach(fn => fn(this.reason));
                }
            });
        };
        try {
            // 立即执行
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {
        // 声明返回的promise2
        let promise2;
        // onFulfilled如果不是函数，就忽略onFulfilled，直接返回value
        onFulfilled = isFunction(onFulfilled) ? onFulfilled : value => value;
        // onRejected如果不是函数，就忽略onRejected，直接扔出错误
        onRejected = isFunction(onRejected)
            ? onRejected
            : err => {
                  throw err;
              };

        if (this.state === 'fulfilled') {
            promise2 = new MyPromise((resolve, reject) => {
                // resolvePromise函数，处理自己return的promise和默认的promise2的关系
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }

        if (this.state === 'rejected') {
            promise2 = new MyPromise((resolve, reject) => {
                // resolvePromise函数，处理自己return的promise和默认的promise2的关系
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }

        if (this.state === 'pending') {
            promise2 = new MyPromise((resolve, reject) => {
                this.onResolvedCallbacks.push(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
                this.onRejectedCallbacks.push(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            });
        }

        // 返回promise，完成链式
        return promise2;
    }

    catch(fn) {
        return this.then(null, fn);
    }

    resolve(val) {
        return new MyPromise((resolve, reject) => {
            resolve(val);
        });
    }
    reject(val) {
        return new MyPromise((resolve, reject) => {
            reject(val);
        });
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    // 循环引用报错
    if (x === promise2) {
        // reject报错
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // 防止多次调用
    let called;
    // x不是null 且x是对象或者函数
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            // A+规定，声明then = x的then方法
            let then = x.then;
            // 如果then是函数，就默认是promise了
            if (typeof then === 'function') {
                // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
                then.call(
                    x,
                    y => {
                        // 成功和失败只能调用一个
                        if (called) return;
                        called = true;
                        // resolve的结果依旧是promise 那就继续解析
                        resolvePromise(promise2, y, resolve, reject);
                    },
                    err => {
                        // 成功和失败只能调用一个
                        if (called) return;
                        called = true;
                        reject(err); // 失败了就失败了
                    }
                );
            } else {
                resolve(x); // 直接成功即可
            }
        } catch (e) {
            // 也属于失败
            if (called) return;
            called = true;
            // 取then出错了那就不要在继续执行了
            reject(e);
        }
    } else {
        resolve(x);
    }
}

module.exports = MyPromise;

MyPromise.deferred = MyPromise.defer = function() {
    var dfd = {};
    dfd.promise = new MyPromise(function(resolve, reject) {
        dfd.resolve = resolve;
        dfd.reject = reject;
    });
    return dfd;
};
