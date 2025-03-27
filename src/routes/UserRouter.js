import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// This is the correct way
router.get('/', userController.getUser);
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/:id', userController.updateUser);
router.get('/:id', userController.getUser);
export default { router };