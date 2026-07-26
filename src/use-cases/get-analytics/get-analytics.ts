import { ShortUrlAttributes } from "../../models/short-url.model";
import { ShortUrlServiceInterface } from "../../services/short-url/short-url.interface";

export type GetAnalyticsReturn = Array<
  Pick<ShortUrlAttributes, "originalUrl" | "shortUrl" | "nbClicks">
>;

export class GetAnalyticsUseCase {
  private readonly shortUrlService: ShortUrlServiceInterface;

  constructor({
    shortUrlService,
  }: {
    shortUrlService: ShortUrlServiceInterface;
  }) {
    this.shortUrlService = shortUrlService;
  }

  async handle(): Promise<GetAnalyticsReturn> {
    const shortUrls = await this.shortUrlService.findAllShortUrls();

    return shortUrls.map((shortUrl) => ({
      originalUrl: shortUrl.originalUrl,
      shortUrl: shortUrl.shortUrl,
      nbClicks: shortUrl.nbClicks,
    }));
  }
}
