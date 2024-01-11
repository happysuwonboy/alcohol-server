import express from 'express';
import { findId} from '../controller/findidController.js';
import { findPassword } from '../controller/findpwController.js';
import { resetPassword  } from '../controller/passwordresetController.js';

const router = express.Router();

router.post('/id', findId);
router.post('/pw', findPassword); 
router.post('/pw/:id', resetPassword ); 

export default router;
