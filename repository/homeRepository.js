import { db } from '../db/database.js';

export async function getList({colum, sign, number}) {
  const sql = `select alcohol_id, 
  alcohol_name, 
  dc_percent, 
  alcohol_img1,
  alcohol_price,
  hashtag
  from alcohol where ${colum} ${sign} ?`

  return db
  .execute(sql, [number])
  .then(row => row[0]);
};

export async function getReviewList() {
  const sql = `select review_id, 
  user_id, 
  rv.order_detail_id, 
  review_star,
  review_content, 
  review_img, 
  alcohol_id 
  from review as rv inner join order_detail as od
  where rv.order_detail_id = od.order_detail_id order by review_date desc`

  return db
  .execute(sql)
  .then(row => row[0]);
};