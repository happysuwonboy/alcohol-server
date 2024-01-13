import express from 'express';
import * as homeController from '../controller/homeController.js';

const router = express.Router();

router.get('/swiper/:condition', homeController.getList);
router.get('/review', homeController.getReviewList);
router.get('/:alcohol_id', homeController.getReviewStart);

export default router;