module.exports = {
    //   rules: {
    //     'no-var': 'error',
    //     'no-undef': 0,
    //     indent: ['error', 2],
    //     semi: 0,
    //     quotes: 0,
    //     'space-before-function-paren': 0,
    //     'no-unused-expressions': 0,
    //   },
    globals: {
        Page: false,
        Component: false,
        wx: false,
        App: false,
        getApp: false,
        getCurrentPages: false,
    },
    extends: ['standard', 'prettier', 'prettier/standard'],
    plugins: ['prettier', 'standard'],
    env: {
        es6: true,
        node: true,
    },
    rules: {
        'no-undef': 0,
        semi: 0,
        indent: 0,
        // indent: ['error', 4],
        'comma-dangle': 0,
        'space-before-function-paren': 0,
        // allow async-await
        'generator-star-spacing': 'off',
    },
};
