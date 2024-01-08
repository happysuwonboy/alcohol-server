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
}

export async function getImgDuplicate(req, res) {
  const {foodImages}  = req.body;
  const serverImages = await fs.readdir('assets/images/food_img');

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
}