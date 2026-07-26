import { GetOriginalUrlUseCase } from "./get-original-url";
import { ShortUrlServiceMock } from "../../services/short-url/short-url.service.mock";
import { createShortUrlMock } from "../../test/mocks/short-url.mock";

describe("GetOriginalUrlUseCase", () => {
  let shortUrlService: ShortUrlServiceMock;
  let getOriginalUrlUseCase: GetOriginalUrlUseCase;

  beforeEach(() => {
    shortUrlService = new ShortUrlServiceMock();
    getOriginalUrlUseCase = new GetOriginalUrlUseCase({ shortUrlService });
  });

  it("should return the original url for a short url", async () => {
    const shortUrl = "4hxNeK";
    const originalUrl = "https://www.lunii.com";

    shortUrlService.findByShortUrl = jest.fn().mockResolvedValue(
      createShortUrlMock({
        originalUrl,
        shortUrl,
      })
    );
    shortUrlService.incrementClicks = jest.fn().mockResolvedValue(undefined);

    const result = await getOriginalUrlUseCase.handle(shortUrl);

    expect(shortUrlService.findByShortUrl).toHaveBeenCalledWith({ shortUrl });
    expect(shortUrlService.incrementClicks).toHaveBeenCalledWith({ shortUrl });
    expect(result).toEqual({
      originalUrl,
    });
  });

  it("should throw an error when the short url is not found", async () => {
    const unknownShortUrl = "unknown";

    shortUrlService.findByShortUrl = jest.fn().mockResolvedValue(null);
    shortUrlService.incrementClicks = jest.fn();

    await expect(getOriginalUrlUseCase.handle(unknownShortUrl)).rejects.toThrow(
      "original url not found for short url: unknown"
    );
    expect(shortUrlService.incrementClicks).not.toHaveBeenCalled();
  });
});
