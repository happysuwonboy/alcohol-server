import * as adminPageController from '../controller/adminPageController.js';
import express  from 'express';

const router = express.Router();

router.get('/product/:page', adminPageController.getAlcoholList);

export default router;