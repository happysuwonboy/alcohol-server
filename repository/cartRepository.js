import {db} from '../db/database.js';

/**
 * 회원의 장바구니 리스트 조회
 */
export async function getCartList(userId) {
    const sql = `SELECT ac.alcohol_id, ac.alcohol_name, ct.qty, ac.alcohol_price, ac.dc_percent, ac.alcohol_img1, ac.stock
                FROM cart ct, alcohol ac
                WHERE ct.alcohol_id = ac.alcohol_id
                AND user_id = ?`;

    return db
        .execute(sql, [userId])
        .then(result => result[0]);
}

/**
 * 장바구니 수량 업데이트
 */
export async function updateQty({userId, alcoholId, checkFlag}){
    let sql = ``;
    if(checkFlag === 'plus'){
          sql = `UPDATE cart 
                 SET qty = qty +1 
                 WHERE user_id=? AND alcohol_id =?`;
    }else{
          sql = `UPDATE cart 
                 SET qty = qty -1 
                 WHERE user_id=? AND alcohol_id =?`;
    }
  
    return db
        .execute(sql, [userId, alcoholId])
        .then((result) => 'ok');
}

/**
 * 장바구니 상품 삭제
 */
export async function removeCart({userId, alcoholId}){  
    const sql = `DELETE FROM cart
                 WHERE user_id = ?
                 AND alcohol_id = ?`;

    return db
        .execute(sql, [userId, alcoholId]) 
        .then((result) => 'ok');
}