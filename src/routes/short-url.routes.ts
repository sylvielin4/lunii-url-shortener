import { Router } from "express";
import { createShortUrlController } from "../controllers/create-short-url/create-short-url.controller";
import { getAnalyticsController } from "../controllers/get-analytics/get-analytics.controller";
import { redirectToOriginalUrlController } from "../controllers/redirect-to-original-url/redirect-to-original-url.controller";

const router = Router();

router.post("/", createShortUrlController);
router.get("/analytics", getAnalyticsController);
router.get("/:shortUrl", redirectToOriginalUrlController);

export default router;
