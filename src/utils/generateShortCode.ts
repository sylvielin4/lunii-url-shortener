const SHORT_URL_LENGTH = 6;

export function generateShortCode(): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + SHORT_URL_LENGTH);
}
