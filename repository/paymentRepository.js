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