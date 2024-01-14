import {db} from '../db/database.js';

/**
 * 주문할 상품 정보 조회
 */
export async function getOrderAlcoholInfo({userId, checked}) {
    const sql = `SELECT ct.alcohol_id, ct.qty, ac.alcohol_name, ac.alcohol_price, ac.dc_percent, ac.alcohol_volume, ac.alcohol_img1
                 FROM cart ct, alcohol ac
                 WHERE ct.alcohol_id = ac.alcohol_id
                 AND ct.user_id = ?
                 AND ct.alcohol_id IN (${checked});`;
    return db
        .execute(sql, [userId])
        .then(result => result[0]);
}

/**
 * 주문 내역 추가
 */
export async function insertOrderInfo({userId, recName, recPhone, recAddress, totalOrderPrice}) {
    const sql = `INSERT INTO order_info(user_id, order_date, total_price, rec_name, rec_phone, rec_address)
	            VALUES(?, now(), ?, ?, ?, ?)`;
    return db
        .execute(sql, [userId, totalOrderPrice, recName, recPhone, recAddress])
        .then(result => 'ok');
}
/**
 * 주문 상세 내역 추가
 */
export async function insertOrderDetail({alcoholId, alcoholQty}) {
    const sql = `INSERT INTO order_detail(order_id, alcohol_id, order_qty, register_review)
	            VALUES((SELECT order_id FROM order_info ORDER BY order_id DESC LIMIT 1),?,?,0)`;
    return db
        .execute(sql, [alcoholId, alcoholQty])
        .then(result => 'ok');
}
/**
 * 상품 재고 update
 */
export async function decreaseAlcoholStock({alcoholId, alcoholQty}) {
    const sql = `UPDATE alcohol SET stock = (stock - ?) where alcohol_id = ?`;
    return db
        .execute(sql, [alcoholQty, alcoholId])
        .then(result => 'ok');
}
/**
 * 장바구니에서 삭제
 */
export async function deleteCart({alcoholId}) {
    const sql = `DELETE FROM cart WHERE alcohol_id = ?`;
    return db
        .execute(sql, [alcoholId])
        .then(result => 'ok');
}
