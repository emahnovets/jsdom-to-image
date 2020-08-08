import puppeteer, { Browser } from 'puppeteer';

export class BrowserHelper {
  #browser!: Browser | null;

  get isBrowserLaunched(): boolean {
    return !!this.#browser;
  }

  async init(): Promise<BrowserHelper> {
    this.#browser = await puppeteer.launch();

    return this;
  }

  async getScreenshot(html: string): Promise<string | undefined> {
    const page = await this.#browser?.newPage();
    await page?.setContent(html, { waitUntil: 'networkidle0' });

    return page?.screenshot();
  }

  async close(): Promise<void> {
    await this.#browser?.close();

    this.#browser = null;
  }
}

export const browserHelper = new BrowserHelper();
