import {db} from '../db/database.js';

/**
 * 배송지 리스트 조회
 */
export async function getrecList(userId) {
    const sql = `SELECT rec_id, rec_name, rec_phone, rec_address, rec_default
                FROM receipt
                WHERE user_id = ?`;

    return db
        .execute(sql, [userId])
        .then(result => result[0]);
}
/**
 * 기본 배송지 조회
 */
export async function getOrderRecInfo(userId) {
    const sql = `SELECT rec_id, rec_name, rec_phone, rec_address, rec_default
                FROM receipt
                WHERE user_id = ? AND rec_default = 1`;

    return db
        .execute(sql, [userId])
        .then(result => result[0]);
}

/**
 * 선택한 배송지 조회
 */
export async function getSelectedRec(recId){
    const sql = `SELECT rec_id, rec_name, rec_phone, rec_address, rec_default
                FROM receipt
                WHERE rec_id = ?`;
    return db
        .execute(sql, [recId])
        .then(result => result[0]);
}

/**
 * 배송지 추가
 */
export async function insertRec(userId, name, phone, address, isDefault) {
    const sql = `INSERT receipt(user_id, rec_name, rec_phone, rec_address, rec_default) 
                 values(?, ?, ?, ?, ?)`;

    return db
        .execute(sql, [userId, name, phone, address, isDefault])
        .then(result => result[0]);
}

/**
 * 기본 배송지 0으로
 */
export async function deleteDefaultRec(userId){
    const sql = `UPDATE receipt
                SET rec_default = 0
                WHERE user_id = ?`;
    return db
        .execute(sql, [userId])
        .then(result => 'ok');
}
/**
 * 배송지 수정
 */
export async function updateRec(recId, name, phone, address, isDefault){
    const sql = `Update receipt
                SET rec_name = ?, rec_phone = ?, rec_address = ?, rec_default = ?
                WHERE rec_id = ?`;
    return db
        .execute(sql, [name, phone, address, isDefault, recId])
        .then(result => 'ok');
}

/**
 * 배송지 삭제
*/
export async function deleteRec(recId){
    const sql = `DELETE FROM receipt
                WHERE rec_id = ?`;
    return db
        .execute(sql, [recId])
        .then(result => 'ok');
}
