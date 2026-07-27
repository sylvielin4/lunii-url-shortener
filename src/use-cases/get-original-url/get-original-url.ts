import { NotFoundError } from "../../errors";
import { ShortUrlAttributes } from "../../models/short-url.model";
import { ShortUrlServiceInterface } from "../../services/short-url/short-url.interface";

export type GetOriginalUrlReturn = Promise<
  Pick<ShortUrlAttributes, "originalUrl">
>;

export class GetOriginalUrlUseCase {
  private readonly shortUrlService: ShortUrlServiceInterface;

  constructor({
    shortUrlService,
  }: {
    shortUrlService: ShortUrlServiceInterface;
  }) {
    this.shortUrlService = shortUrlService;
  }

  async handle(shortUrl: string): GetOriginalUrlReturn {
    const result = await this.shortUrlService.findByShortUrl({ shortUrl });

    if (!result) {
      throw new NotFoundError(
        `original url not found for short url: ${shortUrl}`
      );
    }

    await this.shortUrlService.incrementClicks({ shortUrl });

    return {
      originalUrl: result.originalUrl,
    };
  }
}
