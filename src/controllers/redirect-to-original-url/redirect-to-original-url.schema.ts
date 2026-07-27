import { z } from "zod";
import { SHORT_URL_LENGTH } from "../../constants/short-url";

export const redirectToOriginalUrlSchema = z.object({
  shortUrl: z
    .string()
    .length(SHORT_URL_LENGTH, { message: "invalid short url" }),
});
