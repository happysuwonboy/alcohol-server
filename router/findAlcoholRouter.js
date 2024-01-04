import express from 'express';
import * as findAlcoholController from '../controller/findAlcoholController.js'

const router = express.Router();

router.post('/', findAlcoholController.getFilterList);

export default router;