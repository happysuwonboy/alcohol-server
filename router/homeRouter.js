import express from 'express';
import * as homeController from '../controller/homeController.js';

const router = express.Router();

router.get('/', homeController.getList);
router.get('/review', homeController.getReviewList);

export default router;