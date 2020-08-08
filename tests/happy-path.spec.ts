import { JSDOM } from 'jsdom';
import { takeImage } from '../src';

const testContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    .test-item {
      background-color: green;
      width: 25px;
      height: 100px;
    }
  </style>
</head>
<body>
  <div class="test-item"></div>
</body>
</html>
`;

describe('Happy Path', (): void => {
  let originalDocument: any;

  beforeEach((): void => {
    originalDocument = global.document;

    const { window: { document } } = new JSDOM(testContent);
    global.document = document;
  });

  afterEach((): void => {
    global.document = originalDocument;
  });

  it('should take an image of current content in jsdom', async (): Promise<void> => {
    expect(await takeImage()).toMatchImageSnapshot();
  });
});
