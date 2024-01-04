import express from 'express';
import * as receiptController from '../controller/receiptController.js';

const router = express();

router.get('/:userId', receiptController.getrecList);
router.get('/rec/:recId', receiptController.getSelectedRec);
router.get('/default/:userId', receiptController.getOrderRecInfo);
router.post('/insert', receiptController.insertRec);
router.put('/update', receiptController.updateRec)

export default router;