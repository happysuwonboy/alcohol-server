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
};

/**
 * createProduct : 관리자가 작성한 상품 등록 insert
 * @param {*} req 
 * @param {*} res 
 * @return 등록 처리 결과 메세지
 */
export async function createProduct(req, res) {
  const productForm = req.body;
  const alcoholFiles = req.files?.alcohol_img || [];
  const alcoholImges = alcoholFiles.map(img => img.filename); 
  
  try {
    const result = await  adminPageRepository.createProduct({productForm, alcoholImges});
    if(result === 'insert ok') {
      return res.json(result);
    } else {
      return res.staus(404).send({message: '상품 등록에 실패하였습니다'})
    }
  } catch {
    return res.staus(500).send({message: '서버 오류 발생'})
  }
}