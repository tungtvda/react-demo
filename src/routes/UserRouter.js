import { Router } from "express";
import userController from '../controllers/UserController.js';

const router=Router();
router.post('/',userController.createUser())
export default router