import {
  SaveShortUrlParams,
  SaveShortUrlReturn,
  ShortUrlServiceInterface,
} from "./short-url.interface";

export class ShortUrlServiceMock implements ShortUrlServiceInterface {
  async saveShortUrl(_params: SaveShortUrlParams): SaveShortUrlReturn {
    throw new Error("Not implemented");
  }
}
