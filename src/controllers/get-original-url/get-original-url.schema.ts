import { z } from "zod";
import { SHORT_URL_LENGTH } from "../../constants/short-url";

export const getOriginalUrlSchema = z.object({
  shortUrl: z
    .string()
    .length(SHORT_URL_LENGTH, { message: "invalid short url" }),
});
