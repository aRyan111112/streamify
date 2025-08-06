import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controller.js";

const router = express.Router();

//  this token will help stream to authenticate the user
router.get("/token", protectRoute, getStreamToken);

export default router;