module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        //在rules中添加自定义规则
        // 添加组件命名忽略规则
        "vue/multi-word-component-names": ["error", {
            "ignores": ["index", "main"]//需要忽略的组件名
        }],
        "vue/no-multiple-template-root": 'off',
        "no-undef": 'off',
        "no-unused-vars": "off"
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }
    ]
}