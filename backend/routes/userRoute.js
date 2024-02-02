// Feel free to remove this route file
import { Router } from 'express';
import showUserController from '../controllers/users/showUserController.js';

const router = new Router();

router.get('/', showUserController);

export default router;
