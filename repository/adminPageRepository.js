import {db} from '../db/database.js';

/**
 * getAlcoholList : 상품 목록 조회 ( 페이지네이션 ) ﹒ 검색어 입력 목록 조회 ﹒ sort 정렬 조회
 * @param {*} 페이지네이션 rno 번호, 검색어
 * @returns rows 데이터
 */
export async function getAlcoholList(startIndex, endIndex, searchInput, seletedSort) {
  searchInput && (searchInput = searchInput.trim());
  let sortQuery = 'order by ';

  switch(seletedSort) {
    case 'register_date':
      sortQuery += 'register_date desc';
      break;
    case 'low_stock':
      sortQuery += 'stock';
      break;
    case 'high_stock':
      sortQuery += 'stock desc';
      break;
    case 'low_percent':
      sortQuery += 'dc_percent';
      break;
    case 'high_percent':
      sortQuery += 'dc_percent desc';
      break;
    case 'low_price':
      sortQuery += 'alcohol_price';
      break;
    case 'hign_price':
      sortQuery += 'alcohol_price desc';
      break;
  };

  return db
    .execute(`select * from (
                select
                  row_number() over (${sortQuery}) as rno,
                  count(*) over () as total_cnt,
                  alcohol_id,
                  alcohol_name, 
                  alcohol_price, 
                  dc_percent, 
                  alcohol_type,
                  ABV,
                  alcohol_volume,
                  food,
                  alcohol_comment1,
                  alcohol_comment2,
                  alcohol_img1,
                  alcohol_img2,
                  alcohol_img3,
                  date_format(register_date, '%y-%m-%d') as register_date,
                  flavor_sour,
                  flavor_soda,
                  flavor_sweet,
                  flavor_body,
                  hashtag,
                  stock
                from alcohol 
                ${ searchInput ?  `where alcohol_name like '%${searchInput}%'` : '' }
                ${sortQuery}) as alcohol_result
                where rno between ${startIndex} and ${endIndex}`)
    .then(rows => rows[0]);
};

/**
 * createProduct : 관리자가 작성한 상품 등록 insert
 * @param {*} productForm
 * @param {*} alcoholImges
 * @returns insert ok
 */
export async function createProduct(productForm, {alcoholImges}) {
  const {alcohol_name, alcohol_price, dc_percent, alcohol_type, abv, alcohol_volume, food, alcohol_comment1, alcohol_comment2, flavor_sour, flavor_soda, flavor_sweet, flavor_body, hashtag, stock} = productForm;
  const sql = `insert into alcohol (alcohol_name, alcohol_price, dc_percent, alcohol_type, ABV, alcohol_volume, food, alcohol_comment1, alcohol_comment2, alcohol_img1, alcohol_img2, alcohol_img3, register_date, flavor_sour, flavor_soda, flavor_sweet, flavor_body, hashtag, stock) 
                            values('${alcohol_name}', ${alcohol_price}, ${dc_percent}, '${alcohol_type}', '${abv}', ${alcohol_volume}, '${food}', '${alcohol_comment1}', '${alcohol_comment2}', '${alcoholImges[0]}', '${alcoholImges[1]}', '${alcoholImges[2]}', sysdate(), ${flavor_sour}, ${flavor_soda}, ${flavor_sweet}, ${flavor_body}, '${hashtag}', ${stock})`

  return db
    .execute(sql)
    .then(result => 'insert ok');
};

/**
 * getAlcoholInfo: 클릭한 상품의 정보 조회 ( 모든 정보 )
 * @param {*} alcoholId 
 * @returns row 데이터
 */
export async function getAlcoholInfo(alcoholId) {
  return db
    .execute(`select alcohol_id, alcohol_name, alcohol_price, dc_percent, alcohol_type, ABV, alcohol_volume, food, alcohol_comment1, alcohol_comment2, alcohol_img1, alcohol_img2, alcohol_img3, register_date, flavor_sour, flavor_soda, flavor_sweet, flavor_body, hashtag, stock from alcohol where alcohol_id = ?`, [alcoholId])
    .then(result => result[0][0]);
};


/**
 * updateProduct : 클릭한 상품의 수정 update ( 사진 포함 )
 * @param {*} productForm : 수정 및 기본 입력 데이터 + 사진
 * @returns 
 */
export async function updateProduct(productForm) {
  const { alcohol_id, alcohol_name, alcohol_price, dc_percent, alcohol_type, abv, alcohol_volume, food, alcohol_img, alcohol_comment1, alcohol_comment2, flavor_sour, flavor_soda, flavor_sweet, flavor_body, hashtag, stock } = productForm;
  const sql = `update alcohol set alcohol_name=?, alcohol_price=?, dc_percent=?, alcohol_type=?, ABV=?, alcohol_volume=?, food=?, alcohol_comment1=?, alcohol_comment2=?, alcohol_img1=?, alcohol_img2=?, alcohol_img3=?, flavor_sour=?, flavor_soda=?, flavor_sweet=?, flavor_body=?, hashtag=?, stock=? where alcohol_id=?`

  return db
    .execute(sql, [ alcohol_name, alcohol_price, dc_percent, alcohol_type, abv, alcohol_volume, food, alcohol_comment1, alcohol_comment2, alcohol_img[0], alcohol_img[1], alcohol_img[2], flavor_sour, flavor_soda, flavor_sweet, flavor_body, hashtag, stock, alcohol_id ])
    .then(result => 'update ok');
};

/**
 * removeProduct : 선택한 상품 삭제 ( 여러개 가능 )
 * @param {*} checkedId 
 * @returns delete ok
 */
export async function removeProduct(checkedId) {
  let sqlConditions = ''; // 조건에 들어갈 Id
  
  if(checkedId.length === 1) { // 삭제 상품이 하나일 경우
    sqlConditions = `'${checkedId[0]}'`; 
  } else { // 삭제 상품이 하나가 아닐 경우 : ''로 감싼 뒤 ,로 연결
    sqlConditions = checkedId.map(id => `'${id}'`).join(', ');
  }
  
  return db
    .execute(`delete from alcohol where alcohol_id in(${sqlConditions})`)
    .then(result => 'delete ok')
};