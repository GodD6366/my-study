const babylon = require('babylon');
const t = require('@babel/types');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;

const code = `
  new Promise((reslove,reject)=>{
    reslove();
  });
`;
const ast = babylon.parse(code);

// 箭头函数替换普通函数
traverse(ast, {
    ArrowFunctionExpression(path) {
        const parent = path.findParent(p => p.isExpressionStatement());
        parent.insertBefore(
            t.variableDeclaration('var', [
                t.variableDeclarator(t.identifier('that'), t.thisExpression()),
            ])
        );
        path.replaceWith(
            t.functionExpression(null, path.node.params, path.node.body)
        );
    },
});

console.log(generate(ast, {}, code).code); // const c = a * b;
