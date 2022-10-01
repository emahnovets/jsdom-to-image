module.exports = {
  extends: '@emahnovets/eslint-config-typescript',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': ['**/*.spec.ts', '**/setup-tests.ts']
      }
    ]
  }
};
