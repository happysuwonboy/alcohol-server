import {db} from '../db/database.js';
import bcrypt from 'bcrypt';


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
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  const userSql = `
    INSERT INTO user (user_id, user_name, user_passwd, birthday, user_email, user_phone, address, join_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, sysdate())
  `;
  
  const receiptSql = `
    INSERT INTO receipt (user_id, rec_name, rec_phone, rec_address)
    VALUES (?, ?, ?, ?)
  `;

  const userValues = [userid, name, hashedPassword, birthdate, email, phone, fullAddress];
  const receiptValues = [userid, name, phone, fullAddress];

  // Execute the first SQL statement
  await db.execute(userSql, userValues);

  // Execute the second SQL statement
  await db.execute(receiptSql, receiptValues);

  return 'ok';
}

