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
      if (file.fieldname === 'alcohol_img') {
        uploadPath = path.join(uploadPath, 'alcohol_img');
      } else if (file.fieldname === 'food_img') {
        uploadPath = path.join(uploadPath, 'food_img');
      }
      done(null, uploadPath);
    },
    filename(req, file, done) {
      let fileName;

      // 조건문을 사용하여 필드에 따라 파일 이름 결정
      if (file.fieldname === 'alcohol_img') {
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

const ImgUploadMiddleware = ImgUpload.fields([{ name: 'food_img', maxCount: 3 }, { name: 'alcohol_img', maxCount: 3 }]);


router.get('/product/:page', adminPageController.getAlcoholList);
router.post('/product', ImgUploadMiddleware, adminPageController.createProduct);
router.post('/imgduplicate', adminPageController.getImgDuplicate);

export default router;