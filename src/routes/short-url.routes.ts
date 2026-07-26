import { Router } from "express";
import {
  createShortUrlController,
  getAnalyticsController,
  redirectToOriginalUrlController,
} from "../controllers/short-url.controller";

const router = Router();

router.post("/", createShortUrlController);
router.get("/analytics", getAnalyticsController);
router.get("/:shortUrl", redirectToOriginalUrlController);

export default router;
