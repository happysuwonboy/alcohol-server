import {db} from '../db/database.js';

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