import { ConnectOptions, LaunchOptions } from 'puppeteer';

export interface Options {
  connectOptions?: ConnectOptions;
  launchOptions?: LaunchOptions;
}

export const defaultOptions: Options = {};

let optionsOverrides: Options | null;

export const setGlobalOptions = (options: Options): void => {
  optionsOverrides = options;
};

export const getOptions = (): Options => ({
  ...defaultOptions,
  ...optionsOverrides,
});
