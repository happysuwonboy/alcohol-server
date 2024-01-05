import { db } from '../db/database.js';

export async function getList({ colum, sign, number }) {
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

export async function getReviewStar(alcohol_id) {
  const sql = `select avg_rate
  from alcohol al 
  left outer join 
  (select od.alcohol_id as alcohol_id, count(review_id) as review_cnt,round(avg(review_star), 1) as avg_rate
  from order_detail od inner join review r on od.order_detail_id=r.order_detail_id
  group by od.alcohol_id) ar 
  on al.alcohol_id = ar.alcohol_id
  where al.alcohol_id = ?`

  return db
  .execute(sql, [alcohol_id])
  .then(row => row[0]);
};