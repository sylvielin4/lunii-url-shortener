import { ShortUrlAttributes } from "../../models/short-url.model";

export function createShortUrlMock(
  overrides: Partial<ShortUrlAttributes> = {}
): ShortUrlAttributes {
  return {
    id: 1,
    originalUrl: "https://www.lunii.com",
    shortUrl: "4hxNeK",
    nbClicks: 0,
    ...overrides,
  };
}
