import { GetAnalyticsUseCase } from "./get-analytics";
import { ShortUrlServiceMock } from "../../services/short-url/short-url.service.mock";
import { createShortUrlMock } from "../../test/mocks/short-url.mock";

describe("GetAnalyticsUseCase", () => {
  let shortUrlService: ShortUrlServiceMock;
  let getAnalyticsUseCase: GetAnalyticsUseCase;

  beforeEach(() => {
    shortUrlService = new ShortUrlServiceMock();
    getAnalyticsUseCase = new GetAnalyticsUseCase({ shortUrlService });
  });

  it("should return the analytics for all short urls", async () => {
    shortUrlService.findAllShortUrls = jest.fn().mockResolvedValue([
      createShortUrlMock({
        id: 1,
        shortUrl: "4hxNeK",
        originalUrl: "https://www.lunii.com",
        nbClicks: 3,
      }),
      createShortUrlMock({
        id: 2,
        shortUrl: "abc123",
        originalUrl: "https://example.com",
        nbClicks: 0,
      }),
    ]);

    const result = await getAnalyticsUseCase.handle();

    expect(shortUrlService.findAllShortUrls).toHaveBeenCalled();
    expect(result).toEqual([
      {
        originalUrl: "https://www.lunii.com",
        shortUrl: "4hxNeK",
        nbClicks: 3,
      },
      {
        originalUrl: "https://example.com",
        shortUrl: "abc123",
        nbClicks: 0,
      },
    ]);
  });

  it("should return an empty array when there are no short urls", async () => {
    shortUrlService.findAllShortUrls = jest.fn().mockResolvedValue([]);

    const result = await getAnalyticsUseCase.handle();

    expect(result).toEqual([]);
  });
});
