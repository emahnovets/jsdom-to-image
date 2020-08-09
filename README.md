# JSDOM to image

[![airbnb-style](https://img.shields.io/badge/eslint-airbnb-4B32C3.svg)](https://github.com/airbnb/javascript)
[![npm version](https://badge.fury.io/js/jsdom-to-image.svg)](https://www.npmjs.com/package/jsdom-to-image)

Generate image from JSDOM

Main goal of this package is to be used for regression testing in pair with [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot).

## Installation

```bash
npm install --save-dev jsdom-to-image
```

## Configuration

`setGlobalOptions` should be called once during tests setup.

### Jest example

```ts
// jest.config.js

module.exports = {
  setupFilesAfterEnv: [
    '<rootDir>/setup-tests.js',
  ],
};
```

```js
// setup-tests.js

import { setGlobalOptions } from 'jsdom-to-image';

setGlobalOptions({
  connectOptions: {
    browserWSEndpoint: 'ws://${host}:${port}'
  }
})
```

### Launch configuration

```ts
setGlobalOptions({
  launchOptions: {
    ...
  }
})
```

### Connect to already running browser instance

```ts
setGlobalOptions({
  connectOptions: {
    browserWSEndpoint: 'ws://${host}:${port}'
  }
})
```

## Writing tests

This package could be used for eny framework that uses jsdom.

### @testing-library/react example

```ts
import { takeImage } from 'jsdom-to-image';
import { render } from '@testing-library/react';

test('should match image snapshot', async (): Promise<void> => {
  render(
    <button class="btn btn-default" data-testid="test-button" />
  );

  expect(await takeImage({ targetSelector: '[data-testid=test-button]' })).toMatchImageSnapshot();
});
```

## Possible Issues

Due to differences in rendering on different OS's you could face an issue when tests works on your env and failed on CI or other dev env. To fix this issue you could use [browserless/chrome]() docker image:

```yml
# docker-compose.yml

version: '3'
services:
  browserless:
    image: browserless/chrome:latest
    container_name: "browserless"
    ports:
      - "9090:3000"
```

```ts
// setup-tests.js

import { setGlobalOptions } from 'jsdom-to-image';

setGlobalOptions({
  connectOptions: {
    browserWSEndpoint: 'ws://localhost:9090'
  }
})
```

In that case your test run would look like this:
```bash
docker-compose up -d
npm test
docker-compose down
```
