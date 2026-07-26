import {
  FindByShortUrlParams,
  FindByShortUrlReturn,
  IncrementClicksParams,
  SaveShortUrlParams,
  SaveShortUrlReturn,
  ShortUrlServiceInterface,
} from "./short-url.interface";

export class ShortUrlServiceMock implements ShortUrlServiceInterface {
  async saveShortUrl(_params: SaveShortUrlParams): SaveShortUrlReturn {
    throw new Error("Not implemented");
  }

  async findByShortUrl(_params: FindByShortUrlParams): FindByShortUrlReturn {
    throw new Error("Not implemented");
  }

  async incrementClicks(_params: IncrementClicksParams): Promise<void> {
    throw new Error("Not implemented");
  }
}
