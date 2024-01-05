import express from 'express';
import path from 'path';

const router = express.Router()

const __dirname = path.resolve();

const getStatic = (...dir) =>  express.static(path.join(__dirname, ...dir))

router.use('/alcohol', getStatic('assets', 'images', 'alcohol_img'));
router.use('/food', getStatic('assets', 'images', 'food_img'));
router.use('/review', getStatic('assets', 'images', 'review'));

export default router
