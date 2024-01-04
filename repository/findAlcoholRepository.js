import {db} from '../db/database.js';

export async function getFilterList(searchInput, searchInputPrice, filterInfo, sort) {
  // where절에 들어갈 쿼리 동적 생성
  let sqlConditions = '';

  // 선택한 정렬
  let sortSelected = '';
  if(sort === 'register_date') {
    sortSelected = 'ac.register_date';
  } else if(sort === 'low_price') {
    sortSelected = 'ac.alcohol_price';
  } else {
    sortSelected = 'ac.alcohol_price desc';
  }

  // 3) 해당하는 카테고리의 선택 체크박스 옵션 : 주류
  const handleCategory1 = (category) => {
    let conditions = [];

    category.option.forEach(opt => {
      if (opt.checked) {
        switch (opt.id) {
          case 'takju':  // 탁주
            conditions.push(`ac.alcohol_type = '탁주'`);
            break;
          case 'yakcheongju':  // 약﹒청주
            conditions.push(`ac.alcohol_type = '약·청주'`);
            break;
          case 'gwasilju':  // 과실주
            conditions.push(`ac.alcohol_type = '과실주'`);
            break;
          case 'jeunglyuju':  // 증류주
            conditions.push(`ac.alcohol_type = '증류주'`);
            break;
          case 'gitajulyu':  // 기타주류
            conditions.push(`ac.alcohol_type = '기타주류'`);
            break;
          // default:
          // 생각 중
        }
      }
    });
    return conditions.join(' or ');
  }

  // 3) 해당하는 카테고리의 선택 체크박스 옵션 : 도수
  const handleCategory2 = (category) => {
    let conditions = [];

    category.option.forEach(opt => {
      if(opt.checked) {
        switch(opt.id) {
          case 'abv_1' : 
          conditions.push(`cast(ac.ABV as decimal(10, 2)) between 0 and 10`);
            break;
          case 'abv_2' :
            conditions.push(`cast(ac.ABV as decimal(10, 2)) between 10 and 20`);
            break;
          case 'abv_3' :
            conditions.push(`cast(ac.ABV as decimal(10, 2)) between 20 and 30`);
            break;
          case 'abv_4' : 
          conditions.push(`cast(ac.ABV as decimal(10, 2)) >= 30`);
            break;
            // default:
            // 생각 중
        }
      }
    });
    return conditions.join(' or ');
  }

  // 3) 해당하는 카테고리의 선택 체크박스 옵션 : 단맛
  const handleCategory3 = (category) => {
    let conditions = [];

    category.option.forEach(opt => {
      if(opt.checked) {
        switch(opt.id) {
          case 'sweet_1' : 
            conditions.push(`ac.flavor_sweet between 0 and 1`);
            break;
          case 'sweet_2' : 
            conditions.push(`ac.flavor_sweet = 3`);
            break;
          case 'sweet_3' : 
            conditions.push(`ac.flavor_sweet between 4 and 5`);
            break;
            // default:
            // 생각 중
        }
      }
    });
    return conditions.join(' or ');
  }

  // 3) 해당하는 카테고리의 선택 체크박스 옵션 : 신맛
  const handleCategory4 = (category) => {
    let conditions = [];

    category.option.forEach(opt => {
      if(opt.checked) {
        switch(opt.id) {
          case 'sour_1' : 
            conditions.push(`ac.flavor_sour between 0 and 1`);
            break;
          case 'sour_2' : 
            conditions.push(`ac.flavor_sour = 3`);
            break;
          case 'sour_3' : 
            conditions.push(`ac.flavor_sour between 4 and 5`);
            break;
            // default:
            // 생각 중
        }
      }
    });
    return conditions.join(' or ');
  }

  // 3) 해당하는 카테고리의 선택 체크박스 옵션 : 탄산
  const handleCategory5 = (category) => {
    let conditions = [];

    category.option.forEach(opt => {
      if(opt.checked) {
        switch(opt.id) {
          case 'soda_1' : 
            conditions.push(`ac.flavor_soda between 0 and 1`);
            break;
          case 'soda_2' : 
            conditions.push(`ac.flavor_soda = 3`);
            break;
          case 'soda_3' : 
            conditions.push(`ac.flavor_soda between 4 and 5`);
            break;
            // default:
            // 생각 중
        }
      }
    });
    return conditions.join(' or ');
  }

  // 3)  해당하는 카테고리의 선택 체크박스 옵션 : 가격
  const handleCategory6 = (category) => {
    let condition = [];

    category.option.forEach(opt => {
      if(opt.checked) {
        switch(opt.id) {
          case 'price_1' : 
            condition.push(`ac.alcohol_price <= 10000`);
            break;
          case 'price_2' : 
            condition.push(`ac.alcohol_price between 10000 and 30000`);
            break;
          case 'price_3' : 
            condition.push(`ac.alcohol_price between 30000 and 50000`);
            break;
            case 'price_4' : 
            condition.push(`ac.alcohol_price between 50000 and 100000`);
            break;
            case 'price_5' : 
            condition.push(`ac.alcohol_price >= 100000`);
            break;
            // default:
            // 생각 중
        }
      }
    });
    return condition.join(' or ');
  }


  // 2) 해당하는 카테고리 분류
  const handleCategoryConditions = (category) => {
    let condition = '';

    switch(category.categoryId) {
      case 1 : // 주종
      return condition += `(${handleCategory1(category)})`;
      case 2 : // 도수
      return condition += `(${handleCategory2(category)})`;
      case 3 : // 단맛
      return condition += `(${handleCategory3(category)})`;
      case 4 : // 신맛
      return condition += `(${handleCategory4(category)})`;
      case 5 : // 탄산
      return condition += `(${handleCategory5(category)})`;
      case 6 : // 가격
      return condition += `(${handleCategory6(category)})`;
      // default:
      // return '';
    }
  }

  // 1) 모든 카테고리 중 체크박스 선택 여부 판단 ( 하나라도 있는지 ) 및 최종 쿼리 연산자 적용
  const isCategorySeleted = filterInfo.some(category => category.isSelected);

  if(isCategorySeleted) {
    filterInfo.forEach(category => { // 해당하는 카테고리가 체크된 것이 있다면 option 쿼리문 함수 실행
      if(category.isSelected) sqlConditions += ` and ${handleCategoryConditions(category)}`;
    })
  } else { // 술 이름 검색어 입력 진행
    console.log(searchInput);
    sqlConditions +=  searchInput.length > 0 ? ` and alcohol_name like '%${searchInput}%'` : '';
  }

  // const sql = ` select ac.alcohol_id, alcohol_name, alcohol_price, dc_precent, alcohol_img1, hashtag, review_star
  // 아래 sql selete문 잘가지고 오는지 테스트
  const sql = ` select ac.alcohol_id, alcohol_type, dc_percent, cast(alcohol_price - (alcohol_price / dc_percent) as signed) as dc_price, ABV, flavor_sweet, flavor_soda, flavor_sour, alcohol_name, alcohol_price, alcohol_img1, hashtag, review_star, register_date
                  from alcohol ac
                    left outer join order_detail od on ac.alcohol_id = od.alcohol_id
                    left outer join review rv on od.order_detail_id = rv.order_detail_id
                    where 1 = 1
                    ${sqlConditions}
                    ${searchInputPrice[0].isPrice ? `and alcohol_price between ${searchInputPrice[1].value} and ${searchInputPrice[2].value}` : ''}
                    order by ${sortSelected}`
                      
  console.log(sql); // 테스트
  
  return db
  .execute(sql)
  .then(rows => rows[0]);
}