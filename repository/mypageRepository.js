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


/**
 * 주문 내역 조회
 */
export async function getOrders(userId) {
    const sql = `SELECT oi.order_id, oi.user_id, LEFT(oi.order_date,10) as order_date, oi.total_price, rc.rec_name, rc.rec_phone, rc.rec_address
                FROM order_info oi, receipt rc
                WHERE oi.rec_id = rc.rec_id
                AND oi.user_id = ?
                ORDER BY oi.order_id desc`;

    return db
        .execute(sql, [userId])
        .then(result => result[0]);
}

/**
 * 주문 상품 내역 조회
 */
export async function getOrderDetails(orderId) {
    const sql = `SELECT od.order_id, od.order_qty, ac.alcohol_img1, ac.alcohol_name, ac.alcohol_price, ac.dc_percent, ac.alcohol_volume
                FROM order_detail od, alcohol ac
                WHERE od.alcohol_id = ac.alcohol_id
                AND od.order_id = ?`;

    return db
        .execute(sql, [orderId])
        .then(result => result[0]);
}