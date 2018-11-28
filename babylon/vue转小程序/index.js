const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const t = require('@babel/types');
const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;

const code = fs.readFileSync(path.resolve('./vue.js'), 'utf-8');

const ast = babylon.parse(code, {
    sourceType: 'module',
    plugins: ['flow'],
});

const datas = [];
traverse(ast, {
    ObjectMethod(path) {
        if (path.node.key.name === 'data') {
            path.traverse({
                ReturnStatement(path) {
                    path.traverse({
                        ObjectProperty(path) {
                            datas.push(path.node.key.name);
                            path.skip();
                        },
                    });
                    path.skip();
                },
            });
        }
        path.skip();
    },
});

// 1. 生成data属性

traverse(ast, {
    // 替换导出函数为Page调用
    ExportDefaultDeclaration(path) {
        let page = t.identifier('Page');
        const callExpression = t.callExpression(page, [path.node.declaration]);
        path.insertAfter(callExpression);
        path.remove();
    },
    // data数据提取
    ObjectMethod(path) {
        if (path.node.key.name === 'data') {
            // 获取第一级的 BlockStatement，也就是data函数体
            let blockStatement = null;
            path.traverse({
                //将traverse合并的写法
                BlockStatement(p) {
                    blockStatement = p.node;
                },
            });

            // 用blockStatement生成ArrowFunctionExpression
            const arrowFunctionExpression = t.arrowFunctionExpression(
                [],
                blockStatement
            );
            // 生成CallExpression
            const callExpression = t.callExpression(
                arrowFunctionExpression,
                []
            );
            // 生成data property
            const dataProperty = t.objectProperty(
                t.identifier('data'),
                callExpression
            );
            // 插入到原data函数下方
            path.insertAfter(dataProperty);

            // 删除原data函数
            path.remove();
            // console.log(arrowFunctionExpression)
        }
    },
    ObjectProperty(path) {
        if (path.node.key.name === 'methods') {
            path.insertAfter(path.node.value.properties);
            path.remove();
        }
    },
    MemberExpression(path) {
        if (
            path.node.object.type === 'ThisExpression' &&
            datas.includes(path.node.property.name)
        ) {
            let obj = path.get('object');
            obj.replaceWithSourceString('this.data');
        }
    },
});

console.log(generate(ast, {}, code).code);
