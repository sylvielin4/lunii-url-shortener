import ShortUrl from "../../models/short-url.model";
import {
  SaveShortUrlParams,
  SaveShortUrlReturn,
  ShortUrlServiceInterface,
} from "./short-url.interface";

export class ShortUrlService implements ShortUrlServiceInterface {
  async saveShortUrl(params: SaveShortUrlParams): SaveShortUrlReturn {
    const { originalUrl, shortUrl } = params;
    const record = await ShortUrl.create({
      originalUrl,
      shortUrl,
    });

    return record.get({ plain: true });
  }
}
