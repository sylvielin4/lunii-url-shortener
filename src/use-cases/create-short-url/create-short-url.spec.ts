import { nanoid } from "nanoid";
import { CreateShortUrlUseCase } from "./create-short-url";
import { ShortUrlServiceMock } from "../../services/short-url/short-url.service.mock";
import { createShortUrlMock } from "../../test/mocks/short-url.mock";

jest.mock("nanoid");

const mockedNanoid = jest.mocked(nanoid);

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

    mockedNanoid.mockReturnValue(generatedShortUrl);
    shortUrlService.findByShortUrl = jest.fn().mockResolvedValue(null);
    shortUrlService.saveShortUrl = jest.fn().mockResolvedValue(
      createShortUrlMock({
        originalUrl,
        shortUrl: generatedShortUrl,
      })
    );

    const result = await createShortUrlUseCase.handle(originalUrl);

    expect(shortUrlService.findByShortUrl).toHaveBeenCalledWith({
      shortUrl: generatedShortUrl,
    });
    expect(shortUrlService.saveShortUrl).toHaveBeenCalledWith({
      originalUrl,
      shortUrl: generatedShortUrl,
    });
    expect(result).toEqual({
      originalUrl,
      shortUrl: generatedShortUrl,
    });
  });

  it("should regenerate the short url when a duplicate exists", async () => {
    const duplicateShortUrl = "dup123";
    const newShortUrl = "ok45678";
    const originalUrl = "https://other.com";

    mockedNanoid
      .mockReturnValueOnce(duplicateShortUrl)
      .mockReturnValueOnce(newShortUrl);

    shortUrlService.findByShortUrl = jest
      .fn()
      .mockResolvedValueOnce(
        createShortUrlMock({
          originalUrl,
          shortUrl: duplicateShortUrl,
        })
      )
      .mockResolvedValueOnce(null);

    shortUrlService.saveShortUrl = jest.fn().mockResolvedValue(
      createShortUrlMock({
        id: 2,
        originalUrl,
        shortUrl: newShortUrl,
      })
    );

    const result = await createShortUrlUseCase.handle(originalUrl);

    expect(mockedNanoid).toHaveBeenCalledTimes(2);
    expect(shortUrlService.findByShortUrl).toHaveBeenCalledWith({
      shortUrl: duplicateShortUrl,
    });
    expect(shortUrlService.findByShortUrl).toHaveBeenCalledWith({
      shortUrl: newShortUrl,
    });
    expect(shortUrlService.saveShortUrl).toHaveBeenCalledWith({
      originalUrl,
      shortUrl: newShortUrl,
    });
    expect(result.shortUrl).toBe(newShortUrl);
  });
});
