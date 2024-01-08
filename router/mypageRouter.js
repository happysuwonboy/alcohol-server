import express from 'express';
import * as mypageController from '../controller/mypageController.js';

const router = express();

router.get('/order/:userId', mypageController.getOrders);

export default router;