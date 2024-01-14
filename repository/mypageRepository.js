import { db } from '../db/database.js';

export async function getMyAllReview(userid) {
  const sql = ` select review_id from review where user_id = ?`

  return db
    .execute(sql, [userid])
    .then(result => result[0]);
};

export async function getMyReview({ userid, startIndex, endIndex, searchTerm, selectOption }) {
  let orderBy = '';

  if (selectOption === 'detail') {
    orderBy = 'char_length(review_content) desc'
  } else if (selectOption === 'newest') {
    orderBy = 'review_date desc'
  } else if (selectOption === 'desc') {
    orderBy = 'review_star desc'
  } else {
    orderBy = 'review_star'
  }


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
  where user_id = ? and al_total.alcohol_name like ?) as total_rows
  from (select row_number() over (order by ${orderBy}) as no, 
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
  and alcohol_name like ?
  order by ${orderBy}) as reviewlist
  where no between ? and ?`

  return db
    .execute(sql, [userid, `%${searchTerm}%`, userid, `%${searchTerm}%`, startIndex, endIndex])
    .then(rows => rows[0]);
};

export async function deleteCheckedMyReview(checkedReview) {
  // checkedItems 배열의 길이만큼 ? 문자열로 채우고 ,와 공백으로 연결
  const placeholders = new Array(checkedReview.length).fill('?').join(', ');
  const sql = `delete from review where review_id in (${placeholders})`

  return db
    .execute(sql, checkedReview)
    .then(result => 'ok');
};

export async function deleteMyReview(reviewid) {
  const sql = `delete from review where review_id = ?`

  return db
    .execute(sql, [reviewid])
    .then(result => 'ok');
};

export async function updateMyReview({ id, imagefile, content, star }) {
  const sql = `update review set review_img = ?, review_content = ?, review_star = ? where review_id = ?`;

  return db
    .execute(sql, [imagefile, content, star, id])
    .then(result => 'ok')
};

export async function insertMyReview({ id, orderDetailId, imagefile, content, star }) {
  const sql = `insert into review(user_id, order_detail_id, review_star, review_content, review_img, review_date)
  values (?, ?, ?, ?, ?, sysdate())`;

  return db
    .execute(sql, [id, orderDetailId, star, content, imagefile])
    .then(result => 'insert ok')
};

export async function insertUpdateReview(orderDetailId) {
  const sql = `update order_detail set register_review = 1 where order_detail_id=?`

  return db
  .execute(sql, [orderDetailId])
  .then(result => 'insert update ok')
};

export async function getCreateReview({ userid, startDate, endDate, index }) {
  let where = ``;
  if(!startDate || !endDate ) {
    where = ``;
  } else {
    where = `and order_date between date_add('${startDate}', interval 1 day ) and date_add('${endDate}', interval 1 day )`
  }

  const sql = `select no, order_id, user_id, order_date, total_price, 
  (select count(*) from order_info where user_id = ?) as total_rows
  from (SELECT row_number() over (order by oi.order_id desc) as no,
  oi.order_id, oi.user_id, LEFT(oi.order_date, 10) as order_date, oi.total_price
  FROM order_info oi, receipt rc
  WHERE oi.rec_id = rc.rec_id
  AND oi.user_id = ?
  ${where}
  ORDER BY oi.order_id desc) as orderlist
  where no between ? and ?`

  return db
    .execute(sql, [userid, userid, index, index])
    .then(rows => rows[0]);
};

export async function getCreateReviewDetails({ orderId, searchTerm }) {
  const sql = `select 
  od.order_detail_id as order_detail_id, order_id, register_review, review_id, alcohol_name, alcohol_volume,
  order_qty, alcohol_img1, alcohol_price, dc_percent, al.alcohol_id as alcohol_id
  from order_detail as od 
  inner join alcohol as al on od.alcohol_id = al.alcohol_id
  left join review as rv on od.order_detail_id = rv.order_detail_id
  where order_id = ?
  and alcohol_name like ?`

  return db
    .execute(sql, [orderId, `%${searchTerm}%`])
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