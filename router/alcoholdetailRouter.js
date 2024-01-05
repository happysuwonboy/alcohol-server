import * as alcoholdetailController from '../controller/alcoholdetailController.js';
import express from 'express';

const router = express.Router();

router.get('/:alcohol_id', alcoholdetailController.getAlcoholInfo)

router.get('/recommend/:alcohol_id', alcoholdetailController.getRecommendAlcohols)

router.get('/review/list/:alcohol_id', alcoholdetailController.getReviewList);

export default router