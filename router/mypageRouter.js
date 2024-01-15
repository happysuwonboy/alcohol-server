import express from 'express';
import * as mypageController from '../controller/mypageController.js';
import multer from 'multer';
import path from 'path';
import uuid from 'uuid4';
import * as myUserInfoController from '../controller/myUserInfoController.js'

const router = express.Router();

const reviewImgUpload = multer({
    storage: multer.diskStorage({
        filename(req, file, done) {
            const randomId = uuid(); // 랜덤 아이디를 생성해줌
            const ext = path.extname(file.originalname);
            const fileName = randomId + ext;
            done(null, fileName);
        },
        destination(req, file, done) {
            done(null, path.join(path.resolve(), 'assets', 'images', 'review'))
        }
    })
})

const uploadMiddleWare = reviewImgUpload.single('file')

router.get('/review/all/:userid', mypageController.getMyAllReview);
router.get('/review/:userid', mypageController.getMyReview);
router.get('/review/create/:userid', mypageController.getCreateReview);
router.delete('/review/delete', mypageController.deleteCheckedMyReview);
router.delete('/review/delete/:review_id/:orderDetailId', mypageController.deleteMyReview);
router.post('/review/update/', uploadMiddleWare, mypageController.updateMyReview);
router.post('/review/insert/:userId', uploadMiddleWare, mypageController.insertMyReview);
router.get('/order/:userId', mypageController.getOrders);
router.get('/userinfo/:userId', myUserInfoController.getUserInfo);
router.put('/userinfo/:userId', myUserInfoController.updateUserInfo);
router.delete('/userinfo/:userId', myUserInfoController.deleteUserInfo);

export default router;

