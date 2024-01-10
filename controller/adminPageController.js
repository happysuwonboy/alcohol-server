import * as  adminPageRepository from '../repository/adminPageRepository.js'
import * as fs from 'fs/promises';


/**
 * getAlcoholList : 상품 목록 조회 ( 페이지네이션 )
 * @param {*} req 
 * @param {*} res 
 */
export async function getAlcoholList(req, res) {
  const page = req.params.page;
  const endIndex = page * 10;
  const startIndex = endIndex -9;
  const rows = await adminPageRepository.getAlcoholList({startIndex, endIndex});
  res.json(rows);
};

/**
 * : 이미지 서버 중복체크 ( 파일명 체크 )
 * @param {*} req 
 * @param {*} res 
 */
export async function getImgDuplicate(req, res) {
  const {foodImages}  = req.body;
  console.log(foodImages);
  const serverImages = await fs.readdir('assets/images/food_img');
  console.log(serverImages);
  // 중복 체크
  const duplicateImages = [];
  foodImages.forEach((name, idx) => {
    if(serverImages.includes(name)) {
      duplicateImages.push({idx, filename: name});
    }
  });

  if(duplicateImages.length > 0) {
    res.json({ error: true, message: '이미지 중복 발생', duplicates: duplicateImages})
  } else {
    res.json({error:false, message: '중복 이미지 없음'})
  };
};

export async function createProduct(req, res) {
  const productForm = req.body;
  console.log(req.files);
  const foodImg = req.files?.food_img || [];
  const alcohol = req.files?.alcohol_img || [];
  
  console.log(productForm);
  console.log(alcohol);
  console.log(foodImg)
}