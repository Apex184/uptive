import { Router } from 'express';
import { signup } from '../services/email';

const router = Router();

router.post('/signup', signup);

export default router; 