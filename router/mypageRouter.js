import express from 'express';
import * as controller from '../controller/mypageController.js';

const router = express.Router();

router.get('/review/:userid', controller.getMyReview);

export default router;