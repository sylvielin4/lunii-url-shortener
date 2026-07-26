import { shortUrlService } from "../../services/short-url";
import { CreateShortUrlUseCase } from "./create-short-url";

export const createShortUrlUseCase = new CreateShortUrlUseCase({
  shortUrlService,
});
