import * as  adminPageRepository from '../repository/adminPageRepository.js'
import * as fs from 'fs/promises';


/**
 * getAlcoholList : 상품 목록 조회 ( 페이지네이션 ) ﹒ 검색어 입력 목록 조회
 * @param {*} req 
 * @param {*} res 
 */
export async function getAlcoholList(req, res) {
  const { page, searchInput, seletedSort } = req.body;
  const endIndex = page * 10;
  const startIndex = endIndex -9;
  const rows = await adminPageRepository.getAlcoholList(startIndex, endIndex, searchInput, seletedSort);
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
  let alcoholImges = [];
  for(let i = 0; i < 3; i++) {
    const file = req.files[`alcohol_img${i}`] ;
    alcoholImges.push(file[0].filename);
  }

  try {
    const result = await  adminPageRepository.createProduct(productForm, {alcoholImges});
    if(result === 'insert ok') {
      return res.json(result);
    } else {
      return res.staus(404).send({message: '상품 등록에 실패하였습니다'})
    }
  } catch {
    return res.staus(500).send({message: '서버 오류 발생'})
  }
};

/**
 * getAlcoholInfo: 클릭한 상품의 정보 조회 ( 모든 정보 )
 * @param {*} req 
 * @param {*} res 
 */
export async function getAlcoholInfo(req, res) {
  const {alcoholId} = req.params;
  const row = await adminPageRepository.getAlcoholInfo(alcoholId);
  res.json(row);
};

/**
 * * updateProduct : 클릭한 상품의 수정 update ( 사진 포함 )
 * @param {*} req 
 * @param {*} res 
 */
export async function updateProduct(req, res) {

  // 수정시 파일 객체와 이름만 있는 데이터가 따로 들어오고 메인사진과 상세사진 순서 바뀌지 않도록 추출 필요
  let alcoholImges = [];
  for(let i = 0; i < 3; i++) {
    const file = req.files[`alcohol_img${i}`] // 파일 객체
    const bodyFile = req.body[`alcohol_img${i}`]; // formData로 넘어온 파일 이름

    if(file) {
      alcoholImges.push(file[0].filename); // 해당하는 번호의 파일 객체가 있으면 배열에 넣기
    } else if(bodyFile) {
      alcoholImges.push(bodyFile); // 해당하는 번호의 파일 이름이 있으면 배열에 넣기
    }
  }

  const productForm = {
    ...req.body,
    alcohol_img : alcoholImges
  }
  const result = await adminPageRepository.updateProduct(productForm);
  res.json(result);
};

/**
 * * removeProduct : 선택한 상품 삭제 ( 여러개 가능 )
 * @param {*} req 
 * @param {*} res 
 */
export async function removeProduct(req, res) {
  const { checkedId } = req.body;
  const result = await adminPageRepository.removeProduct(checkedId);
  res.json(result);
}