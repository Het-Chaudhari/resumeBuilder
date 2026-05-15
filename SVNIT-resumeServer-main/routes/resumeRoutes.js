import express from 'express';
import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume
} from '../controllers/resumeController.js';
import { authenticateToken } from '../controllers/authenticateToken.js';

const router = express.Router();

router.post('/', authenticateToken, createResume)
router.get('/', authenticateToken, getUserResumes)
router.get('/:id', getResumeById)
router.put('/:id', authenticateToken, updateResume)
router.delete('/:id', authenticateToken, deleteResume)


export default router;