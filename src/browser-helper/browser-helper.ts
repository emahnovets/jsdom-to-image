import puppeteer, { Browser } from 'puppeteer';
import { ItemNotFoundError } from '../item-not-found-error';
import { getOptions } from '../options';

export interface ScreenshotOptions {
  fullPage?: boolean;
  selector?: string;
}

export class BrowserHelper {
  #browser!: Browser | null;

  get isBrowserLaunched(): boolean {
    return !!this.#browser;
  }

  async init(): Promise<void> {
    const options = getOptions();

    if (options.connectOptions) {
      this.#browser = await puppeteer.connect(options.connectOptions);
      return;
    }

    this.#browser = await puppeteer.launch(options.launchOptions);
  }

  async getScreenshot(html: string, options?: ScreenshotOptions): Promise<string | undefined> {
    const page = await this.#browser?.newPage();
    await page?.setContent(html, { waitUntil: 'networkidle0' });

    if (options?.selector) {
      const element = await page?.$(options.selector);

      if (!element) {
        throw new ItemNotFoundError(options.selector);
      }

      return element?.screenshot();
    }

    return page?.screenshot({
      fullPage: options?.fullPage ?? true,
      encoding: 'base64',
    });
  }

  async close(): Promise<void> {
    await this.#browser?.close();

    this.#browser = null;
  }
}

export const browserHelper = new BrowserHelper();
