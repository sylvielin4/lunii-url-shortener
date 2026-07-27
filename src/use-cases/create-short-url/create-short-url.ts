import { nanoid } from "nanoid";
import { SHORT_URL_LENGTH } from "../../constants/short-url";
import { ShortUrlAttributes } from "../../models/short-url.model";
import { ShortUrlServiceInterface } from "../../services/short-url/short-url.interface";

export type CreateShortUrlReturn = Pick<
  ShortUrlAttributes,
  "originalUrl" | "shortUrl"
>;

export class CreateShortUrlUseCase {
  private readonly shortUrlService: ShortUrlServiceInterface;

  constructor({
    shortUrlService,
  }: {
    shortUrlService: ShortUrlServiceInterface;
  }) {
    this.shortUrlService = shortUrlService;
  }

  async handle(originalUrl: string): Promise<CreateShortUrlReturn> {
    const shortUrl = nanoid(SHORT_URL_LENGTH);

    const existingUrl = await this.shortUrlService.findByShortUrl({ shortUrl });

    if (existingUrl) {
      return this.handle(originalUrl);
    }

    const result = await this.shortUrlService.saveShortUrl({
      originalUrl,
      shortUrl,
    });

    return {
      originalUrl: result.originalUrl,
      shortUrl: result.shortUrl,
    };
  }
}
