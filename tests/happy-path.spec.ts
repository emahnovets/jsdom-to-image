import { JSDOM } from 'jsdom';
import { ItemNotFoundError, takeImage } from '../src';

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
  jest.setTimeout(15000);
  let originalDocument: Document;

  beforeEach((): void => {
    originalDocument = global.document;

    const {
      window: { document },
    } = new JSDOM(testContent);
    global.document = document;
  });

  afterEach((): void => {
    global.document = originalDocument;
  });

  it('should take an image of current content in jsdom', async (): Promise<void> => {
    expect(await takeImage()).toMatchImageSnapshot();
  });

  it('should take an image using selector', async (): Promise<void> => {
    expect(await takeImage({ selector: '.test-item' })).toMatchImageSnapshot();
  });

  it('should take an image using selector if no item found', async (): Promise<void> => {
    await expect(takeImage({ selector: '.test-item1' })).rejects.toThrow(ItemNotFoundError);
  });
});
