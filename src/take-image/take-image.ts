import { ScreenshotOptions, browserHelper } from '../browser-helper';

export const takeImage = async (options?: ScreenshotOptions): Promise<string> => {
  let screenshot: string | Buffer = '';

  try {
    await browserHelper.init();
    screenshot = (await browserHelper.getScreenshot(document.documentElement.outerHTML, options)) ?? '';
  } finally {
    await browserHelper.close();
  }

  return screenshot?.toString();
};
