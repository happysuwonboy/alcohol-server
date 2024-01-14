import express from 'express';
import * as cartController from '../controller/cartController.js';

const router = express();

router.get('/:userId', cartController.getCartList);
router.get('/update/:userId/:alcoholId/:checkFlag', cartController.updateQty);
router.post('/insert', cartController.insertCart);
router.put('/update', cartController.updateCart);
router.delete('/delete/:userId/:alcoholId', cartController.removeCart);

export default router;