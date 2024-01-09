import express from 'express';
import * as mypageController from '../controller/mypageController.js';
import * as myUserInfoController from '../controller/myUserInfoController.js'

const router = express.Router();

router.get('/review/:userid', mypageController.getMyReview);
router.get('/order/:userId', mypageController.getOrders);
router.get('/userinfo/:userId', myUserInfoController.getUserInfo);
router.put('/userinfo/:userId', myUserInfoController.updateUserInfo);
router.delete('/userinfo/:userId', myUserInfoController.deleteUserInfo);

export default router;

