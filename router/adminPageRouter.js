import * as adminPageController from '../controller/adminPageController.js';
import express  from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

router.get('/product/:page', adminPageController.getAlcoholList);
router.post('/imgduplicate', adminPageController.getImgDuplicate);

export default router;