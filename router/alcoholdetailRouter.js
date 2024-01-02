import * as alcoholdetailController from '../controller/alcoholdetailController.js';
import express from 'express';

const router = express.Router();

router.get('/:alcohol_id', alcoholdetailController.getAlcoholInfo)

export default router