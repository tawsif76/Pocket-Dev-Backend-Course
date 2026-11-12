import { Router } from "express";
import { profileController } from "../controllers/profileController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const profileRouter = Router();

profileRouter.get('/', authMiddleware, profileController);

export default profileRouter;