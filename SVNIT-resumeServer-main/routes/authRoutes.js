import express from 'express';
import { login, signup, getProfile, changePassword,forgotPass,resetPassword } from '../controllers/authController.js';
import dotenv from 'dotenv';
import { seedUsers } from '../controllers/createAllUsers.js';

dotenv.config();
const router = express.Router();


router.post('/login', login);
router.post(process.env.AB_KAR, seedUsers);
router.get('/login', getProfile);
router.post('/change-password', changePassword)
router.post('/forgot-password',forgotPass);
router.post('/reset-password/:token', resetPassword);


export default router;