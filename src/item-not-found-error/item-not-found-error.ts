export class ItemNotFoundError extends Error {
  constructor(selector: string) {
    super(`No item found for given selector: ${selector}`);
  }
}
