import { db } from './../db/database.js';


export async function getAlcoholInfo(alcohol_id) {
  return db
  .execute(`select al.alcohol_id, alcohol_name, alcohol_price, dc_percent, alcohol_type, ABV, alcohol_volume,
                  food, alcohol_comment1, alcohol_comment2, alcohol_img1, alcohol_img2, alcohol_img3, 
                  left(register_date, 10) as register_date, hashtag, flavor_sweet, flavor_sour, 
                  flavor_soda, flavor_body, review_cnt, avg_rate, stock
                  from alcohol al 
                  left outer join 
                  (select od.alcohol_id as alcohol_id, count(review_id) as review_cnt,round(avg(review_star), 1) as avg_rate
                  from order_detail od inner join review r on od.order_detail_id=r.order_detail_id
                  group by od.alcohol_id) ar 
                  on al.alcohol_id = ar.alcohol_id
                  where al.alcohol_id=?`,[alcohol_id])
  .then(result => result[0][0])
  .catch(err => console.log(err))
}

export async function getRecommendAlcohols(alcohol_id) {
  return db
  .execute(`select al.alcohol_id, alcohol_name, alcohol_price, dc_percent, alcohol_img1 as alcohol_img,
            ifnull(review_cnt,0) as review_cnt, ifnull(avg_rate, 0) as avg_rate
            from alcohol al 
            left outer join 
            (select od.alcohol_id as alcohol_id, 
            count(review_id) as review_cnt,round(avg(review_star), 1) as avg_rate 
            from order_detail od inner join review r on od.order_detail_id=r.order_detail_id 
            group by od.alcohol_id) ar 
            on al.alcohol_id = ar.alcohol_id
            where alcohol_type = (select alcohol_type from alcohol where alcohol_id=?) 
            and al.alcohol_id != ?
            order by avg_rate desc, review_cnt desc, al.alcohol_id asc`,[alcohol_id,alcohol_id])
  .then(result => result[0])
  .catch(err => console.log(err))
} 

export async function getReviewList({selectOption, alcohol_id, startIndex, endIndex}) {
  let orderBy = '';

  if(selectOption === 'detail') {
    orderBy = 'char_length(review_content) desc'
  } else if (selectOption === 'newest') {
    orderBy = 'review_date desc'
  } else if (selectOption === 'desc') {
    orderBy = 'review_star desc'
  } else {
    orderBy = 'review_star'
  }

  const sql = `select 
  no, 
  review_id, 
  user_id, 
  order_detail_id, 
  review_star, 
  review_content, 
  review_img, 
  alcohol_id, 
  review_date, 
  char_length(review_content)
  from (select row_number() over (order by ${orderBy}) as no,
  review_id, 
  user_id, 
  rv.order_detail_id, 
  review_star, 
  review_content, 
  review_img, 
  date_format(review_date, '%y.%m.%d') as review_date,
  char_length(review_content),
  alcohol_id 
  from review as rv inner join order_detail as od
  where rv.order_detail_id = od.order_detail_id
  and od.alcohol_id = ?
  order by ${orderBy}) as reviewlist
  where no between ? and ?`

  return db
  .execute(sql, [alcohol_id, startIndex, endIndex])
  .then(rows => rows[0])
  .catch(error => console.log(error));
};