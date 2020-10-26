module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'no-unused-vars': [1, { vars: 'all', args: 'after-used' }],
  },
};
