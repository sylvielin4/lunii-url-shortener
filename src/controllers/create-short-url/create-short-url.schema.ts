import { z } from "zod";

function isValidHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url);

    return (
      ["http:", "https:"].includes(parsed.protocol) &&
      parsed.hostname.includes(".")
    );
  } catch {
    return false;
  }
}

export const createShortUrlSchema = z.object({
  originalUrl: z
    .url({ error: "invalid url" })
    .refine(isValidHttpUrl, { message: "invalid url" }),
});
