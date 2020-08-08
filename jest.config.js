module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  moduleFileExtensions: [
    'ts',
    'json',
    'js',
  ],
  rootDir: '.',
  testRegex: '.spec.ts$',
  setupFilesAfterEnv: [
    '<rootDir>/setup-tests/setup-tests.ts',
  ],
  testEnvironment: 'node',
};
