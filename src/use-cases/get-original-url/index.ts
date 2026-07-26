import { GetOriginalUrlUseCase } from "./get-original-url";
import { shortUrlService } from "../../services/short-url";

export const getOriginalUrlUseCase = new GetOriginalUrlUseCase({
  shortUrlService,
});
