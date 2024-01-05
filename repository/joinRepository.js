import {db} from '../db/database.js';

export async function getIdCheck(id) {
  const sql = 'SELECT COUNT(user_id) AS cnt FROM user WHERE user_id = ?';

  try {
    const rows = await db.execute(sql, [id]);
    return rows[0][0]; // { cnt: 1 } or { cnt: 0 }
  } catch (error) {
    console.error('ID 확인 중 오류 발생:', error);
    throw error; // 호출자에게 에러 전파
  }
}

export async function createUser(userid, name, password, birthdate, email, phone, fullAddress) {
  const sql = `
    INSERT INTO user (user_id, user_name, user_passwd, birthday, user_email, user_phone, address, join_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, sysdate())
  `;
  return db
        .execute(sql, [userid, name, password, birthdate, email, phone, fullAddress])
        .then((result) => 'ok');
}

