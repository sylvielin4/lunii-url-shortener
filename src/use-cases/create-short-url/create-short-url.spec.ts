import { CreateShortUrlUseCase } from "./create-short-url";
import { ShortUrlServiceMock } from "../../services/short-url/short-url.service.mock";
import { createShortUrlMock } from "../../test/mocks/short-url.mock";
import * as generateShortCodeModule from "../../utils/generateShortCode";

jest.mock("../../utils/generateShortCode");

describe("CreateShortUrlUseCase", () => {
  let shortUrlService: ShortUrlServiceMock;
  let createShortUrlUseCase: CreateShortUrlUseCase;

  beforeEach(() => {
    jest.clearAllMocks();

    shortUrlService = new ShortUrlServiceMock();
    createShortUrlUseCase = new CreateShortUrlUseCase({
      shortUrlService,
    });
  });

  it("should save the original url with the generated short url", async () => {
    const originalUrl = "https://www.lunii.com";
    const generatedShortUrl = "4hxNeK";

    jest
      .spyOn(generateShortCodeModule, "generateShortCode")
      .mockReturnValue(generatedShortUrl);
    shortUrlService.saveShortUrl = jest.fn().mockResolvedValue(
      createShortUrlMock({
        originalUrl,
        shortUrl: generatedShortUrl,
      })
    );

    const result = await createShortUrlUseCase.handle(originalUrl);

    expect(shortUrlService.saveShortUrl).toHaveBeenCalledWith({
      originalUrl,
      shortUrl: generatedShortUrl,
    });
    expect(result).toEqual({
      originalUrl,
      shortUrl: generatedShortUrl,
    });
  });
});
