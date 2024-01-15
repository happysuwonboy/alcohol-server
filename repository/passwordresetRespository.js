import bcrypt from 'bcrypt';
import { db } from '../db/database.js';

export const updatePassword = async (userId, newPassword) => {
  try {
    // 새로운 비밀번호를 bcrypt로 해싱
    const hashedPassword = await bcrypt.hash(newPassword, 10); // 두 번째 파라미터는 salt rounds를 나타냅니다. 적절한 값으로 조정하세요.

    // 업데이트 쿼리 실행
    await db.query('UPDATE user SET user_passwd = ? WHERE user_id = ?', [hashedPassword, userId]);
  } catch (error) {
    console.error('Error in updatePassword:', error);
    throw error;
  }
};
