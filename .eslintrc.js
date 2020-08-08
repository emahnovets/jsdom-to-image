module.exports = {
  env: {
    node: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:jest/recommended',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    indent: ['error', 2],
    '@typescript-eslint/no-explicit-any': ['error'],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        jsx: 'never',
        tsx: 'never',
      },
    ],
    'max-len': [
      'error',
      120,
      2,
      {
        ignoreUrls: false,
        ignoreComments: false,
        ignoreRegExpLiterals: false,
        ignoreStrings: false,
        ignoreTemplateLiterals: false,
      },
    ],
  },
  overrides: [
    {
      files: [
        '*.spec.ts',
        '*.spec.js',
        '*.test.ts',
        '*.test.js',
        '*.e2e-spec.ts',
        '*.e2e-spec.js',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
  ],
};
