import express from 'express';
import * as controller from '../controller/myPageController.js';

const router = express.Router();

router.get('/review/:userid', controller.getMyReview);

export default router;