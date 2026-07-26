import ShortUrl from "../../models/short-url.model";
import {
  FindByShortUrlParams,
  FindByShortUrlReturn,
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

  async findByShortUrl(params: FindByShortUrlParams): FindByShortUrlReturn {
    const { shortUrl } = params;
    const record = await ShortUrl.findOne({ where: { shortUrl } });

    if (!record) {
      return null;
    }

    return record.get({ plain: true });
  }
}
