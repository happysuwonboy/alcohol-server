import express from 'express';
import * as paymentController from '../controller/paymentController.js';

const router = express();

router.get('/', paymentController.getOrderAlcoholInfo);

export default router;