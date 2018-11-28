const babylon = require('babylon');
const t = require('@babel/types');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;

// 生成 const a = 1;
const code = ``;
const ast = babylon.parse(code);

let dec = t.variableDeclarator(t.identifier('a'), t.numericLiteral(1));

let res = t.variableDeclaration('const', [dec]);
ast.program.body.push(res);
console.log(generate(ast, {}, code).code); // this.data.count;

/* 生成
function add(a, b) {
  return a + b
}
 */
let a = t.identifier('a');
let b = t.identifier('b');
let binaryExpres = t.binaryExpression('+', a, b);
let returnState = t.returnStatement(binaryExpres);
let blockState = t.blockStatement([returnState]);
let funName = t.identifier('add');
let fun = t.functionDeclaration(funName, [a, b], blockState);

ast.program.body.push(fun);
console.log(generate(ast, {}, code).code);
