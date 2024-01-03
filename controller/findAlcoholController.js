import * as findAlcoholRepository from '../repository/findAlcoholRepository.js';

/**
 * getFilterList : 선택한 체크박스, 정렬 등 필터링한 술 상품 정보 리스트 조회
 * @param {*} req 
 * @param {*} res 
 * @returns rows 데이터
 */
export async function getFilterList(req, res) {
  const {filterInfo, sort} = req.body;
  const rows = await findAlcoholRepository.getFilterList(filterInfo, sort);
  res.json(rows);
}