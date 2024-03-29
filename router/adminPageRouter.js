import * as adminPageController from '../controller/adminPageController.js';
import express  from 'express';
import multer from 'multer';
import path from 'path';
import uuid from 'uuid4';

const router = express.Router();

const ImgUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      let uploadPath = path.join(path.resolve(), 'assets', 'images');

      // 조건문을 사용하여 필드에 따라 저장 경로 결정
      if (file.fieldname.includes('alcohol_img')) {
        uploadPath = path.join(uploadPath, 'alcohol_img');
      } else if (file.fieldname === 'food_img') {
        uploadPath = path.join(uploadPath, 'food_img');
      }
      done(null, uploadPath);
    },
    filename(req, file, done) {
      let fileName;

      // 조건문을 사용하여 필드에 따라 파일 이름 결정
      if (file.fieldname.includes('alcohol_img')) {
        const randomId = uuid();
        const ext = path.extname(file.originalname);
        fileName = randomId + ext;
      } else if (file.fieldname === 'food_img') {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString(
          'utf8',
          );
        fileName = file.originalname;
      }
      done(null, fileName);
    }
  })
});

const ImgUploadMiddleware = ImgUpload.fields([{ name: 'food_img', maxCount: 3 }, { name: 'alcohol_img0' }, { name: 'alcohol_img1' }, { name: 'alcohol_img2' }]);


router.post('/product/search', adminPageController.getAlcoholList); // 기본 리스트 조회 및 검색어 조회
router.post('/product/create', ImgUploadMiddleware, adminPageController.createProduct);
router.get('/update/:alcoholId', adminPageController.getAlcoholInfo);
router.post('/update/modify/:alcoholId', ImgUploadMiddleware, adminPageController.updateProduct);
router.post('/delete', adminPageController.removeProduct);
router.post('/imgduplicate', adminPageController.getImgDuplicate); // food 이미지 서버 중복체크

export default router;
