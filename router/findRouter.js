import express from 'express';
import { findId } from '../controller/findidController.js';

const router = express.Router();

router.post('/id', findId);

export default router;