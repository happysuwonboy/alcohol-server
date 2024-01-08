import express from 'express';
import * as paymentController from '../controller/paymentController.js';

const router = express();

router.get('/', paymentController.getOrderAlcoholInfo);
router.post('/', paymentController.insertOrder);

export default router;