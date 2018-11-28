const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const t = require('@babel/types');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;

const code = fs.readFileSync(path.resolve('../vue转小程序/vue.js'), 'utf-8');
const ast = babylon.parse(code, {
    sourceType: 'module',
    plugins: ['flow'],
});

// 该代码打印所有 node.type。 可以使用`path.type`，可以使用`path.node.type`
let space = 0;

traverse(ast, {
    enter(path) {
        console.log(new Array(space).fill(' ').join(''), '>', path.node.type);
        space += 2;
    },
    exit(path) {
        space -= 2;
        // console.log(new Array(space).fill(' ').join(''), '<', path.type)
    },
});

// parent 父节点
// findParent 查询满足条件的父节点
// find 从Node节点找起
// container 没太搞清楚，访问的NodePath如果是在array中的时候比较有用
// getSibling 根据index获取兄弟节点
// skip 最后介绍一下skip，执行之后，就不会在对叶节点进行遍历
console.log(generate(ast, {}, code).code);
