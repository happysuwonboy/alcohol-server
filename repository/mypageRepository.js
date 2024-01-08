import {db} from '../db/database.js';

export async function getMyReview({userid, startIndex, endIndex}) {
  const sql = `select no, 
  review_id, 
  user_id, 
  order_detail_id, 
  review_star, 
  review_content, 
  review_img, 
  alcohol_id, 
  review_date, 
  detail, 
  alcohol_name,
  (select count(*) from review as rv_total 
  inner join order_detail as od_total on rv_total.order_detail_id = od_total.order_detail_id
  inner join alcohol as al_total on al_total.alcohol_id = od_total.alcohol_id
  where user_id = ?) as total_rows
  from (select row_number() over (order by review_id) as no, 
  review_id, 
  user_id, 
  rv.order_detail_id, 
  review_star, 
  review_content, 
  review_img, 
  al.alcohol_id, 
  date_format(review_date, '%y.%m.%d') review_date, 
  char_length(review_content) as detail, 
  alcohol_name
  from review as rv 
  inner join order_detail as od 
  inner join alcohol as al
  where rv.order_detail_id = od.order_detail_id
  and al.alcohol_id = od.alcohol_id
  and user_id = ?
  order by review_date desc) as reviewlist
  where no between ? and ?`

  return db
  .execute(sql, [userid, userid, startIndex, endIndex])
  .then(rows => rows[0]);
};