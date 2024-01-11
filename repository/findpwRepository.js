// findpwRepository.js

import { db } from '../db/database.js';

// 이메일과 아이디를 기준으로 사용자 정보를 조회하는 함수
export const findPw = async (email, userId) => {
  try {
    // SQL 쿼리를 사용하여 사용자 정보를 조회합니다.
    const [rows] = await db.query('SELECT * FROM user WHERE user_email = ? AND user_id = ?', [email, userId]);
    
    // 사용자 정보가 존재하면 user_id를 반환합니다.
    if (rows.length > 0) {
      return rows[0].user_id;
    } else {
      return null; // 사용자 정보가 없을 경우 null을 반환합니다.
    }
  } catch (error) {
    // 오류 발생 시 에러를 던집니다.
    throw error;
  }
};
