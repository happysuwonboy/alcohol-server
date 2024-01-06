import * as findAlcoholRepository from '../repository/findAlcoholRepository.js';

/**
 * getFilterList : 선택한 체크박스, 정렬, 검색, 가격 검색에 대한 필터 정보 리스트 조회
 * @param {*} req
 * searchInput : 술 이름 검색어
 * searchInputPrice : 가격 검색어 ( 입력 여부, 최소﹒최대 가격 )
 * filterInfo : 체크박스 정보 ( 카테고리별 여부 및 체크박스 정보 )
 * sort : 정렬 선택
 * @param {*} res 
 * @returns rows 데이터
 */
export async function getFilterList(req, res) {
  const { searchInput, searchInputPrice, filterInfo, sort, currentPage } = req.body;
  const endIndex = currentPage * 12;
  const startIndex = endIndex - 11;
  const rows = await findAlcoholRepository.getFilterList(searchInput, searchInputPrice, filterInfo, sort, startIndex, endIndex);
  res.json(rows);
}