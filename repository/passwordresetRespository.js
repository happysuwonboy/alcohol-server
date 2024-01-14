import { db } from '../db/database.js';

// 비밀번호 재설정과 관련된 데이터베이스 작업을 수행하는 리포지토리

export const getPasswordResetToken = async (userId) => {
  try {
    const [rows, fields] = await db.query('SELECT reset_token FROM users WHERE id = ?', [userId]);
    return rows[0] ? rows[0].reset_token : null;
  } catch (error) {
    console.error('Error in getPasswordResetToken:', error);
    throw error;
  }
};

export const updatePassword = async (userId, newPassword) => {
  try {
    await db.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, userId]);
  } catch (error) {
    console.error('Error in updatePassword:', error);
    throw error;
  }
};
