import { ShortUrlAttributes } from "../../models/short-url.model";

export type SaveShortUrlParams = {
  originalUrl: string;
  shortUrl: string;
};

export type SaveShortUrlReturn = Promise<ShortUrlAttributes>;

export interface ShortUrlServiceInterface {
  saveShortUrl(params: SaveShortUrlParams): SaveShortUrlReturn;
}
