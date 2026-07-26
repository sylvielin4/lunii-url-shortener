import { ShortUrlAttributes } from "../../models/short-url.model";
import { ShortUrlServiceInterface } from "../../services/short-url/short-url.interface";
import { generateShortCode } from "../../utils/generateShortCode";

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
    const shortUrl = generateShortCode();

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
