import { ShortUrlAttributes } from "../../models/short-url.model";

export type SaveShortUrlParams = {
  originalUrl: string;
  shortUrl: string;
};

export type SaveShortUrlReturn = Promise<ShortUrlAttributes>;

export type FindByShortUrlParams = {
  shortUrl: string;
};

export type FindByShortUrlReturn = Promise<ShortUrlAttributes | null>;

export type IncrementClicksParams = {
  shortUrl: string;
};

export interface ShortUrlServiceInterface {
  saveShortUrl(params: SaveShortUrlParams): SaveShortUrlReturn;
  findByShortUrl(params: FindByShortUrlParams): FindByShortUrlReturn;
  incrementClicks(params: IncrementClicksParams): Promise<void>;
}
