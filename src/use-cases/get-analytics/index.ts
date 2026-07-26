import { shortUrlService } from "../../services/short-url";
import { GetAnalyticsUseCase } from "./get-analytics";

export const getAnalyticsUseCase = new GetAnalyticsUseCase({
  shortUrlService,
});
