import express from 'express';
import userRouter from './UserRouter.js';

const router = express.Router();

// Mount the user routes
router.use('/api/user', userRouter.router);


export default router;