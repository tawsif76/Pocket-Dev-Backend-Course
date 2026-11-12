import { Router } from 'express';
import { login } from "../controllers/loginController.js";
import { signup } from '../controllers/signupController.js';
import { logout } from '../controllers/logoutController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', authMiddleware, logout);

export default authRouter;
