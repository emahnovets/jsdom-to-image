import { browserHelper } from '../browser-helper';

export const takeImage = async (): Promise<string | null> => {
  let screenshot: string | null = null;

  try {
    await browserHelper.launch();
    screenshot = await browserHelper.getScreenshot(document.documentElement.outerHTML) ?? null;
  } finally {
    await browserHelper.close();
  }

  return screenshot;
};

export default takeImage;
