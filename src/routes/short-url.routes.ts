import { Router } from "express";
import {
  createShortUrlController,
  redirectToOriginalUrlController,
} from "../controllers/short-url.controller";

const router = Router();

router.post("/", createShortUrlController);
router.get("/:shortUrl", redirectToOriginalUrlController);

export default router;
