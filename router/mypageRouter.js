import express from 'express';
import * as mypageController from '../controller/mypageController.js';

const router = express.Router();

router.get('/review/:userid', mypageController.getMyReview);
router.get('/order/:userId', mypageController.getOrders);


export default router;


