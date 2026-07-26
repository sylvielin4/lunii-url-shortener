import { Router } from "express";
import { createShortUrlController } from "../controllers/create-short-url.controller";
import { getAnalyticsController } from "../controllers/get-analytics.controller";
import { redirectToOriginalUrlController } from "../controllers/get-original-url.controller";

const router = Router();

router.post("/", createShortUrlController);
router.get("/analytics", getAnalyticsController);
router.get("/:shortUrl", redirectToOriginalUrlController);

export default router;
