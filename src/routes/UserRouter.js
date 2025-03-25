import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// This is the correct way
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
export default { router };