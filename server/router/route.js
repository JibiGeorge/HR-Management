import express from 'express';
import { login,verifyToken } from '../controller/login.js';
const router = express.Router();

router.post('/login',login);
router.post('/verifyToken',verifyToken);

export default router;