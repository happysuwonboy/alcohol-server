import express from 'express';
import * as controller from '../controller/joinController.js';

const router = express.Router();


router.get('/:id', controller.getIdCheck);
router.post('/', controller.createUser);

export default router;