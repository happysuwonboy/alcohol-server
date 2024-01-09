import {db} from '../db/database.js';

export const getUserInfoById = async (userId) => {
  try {
      const [rows, fields] = await db.query('SELECT * FROM user WHERE user_id = ?', [userId]);
      return rows[0];
  } catch (error) {
      console.error('Error fetching user information:', error);
      throw error;
  }
};

export const updateUserInfoById = async (userId, updatedInfo) => {
  try {
      await db.query('UPDATE user SET user_email = ?, user_phone = ? WHERE user_id = ?', [
          updatedInfo.user_email,
          updatedInfo.user_phone,
          userId
      ]);

      // rec_phone을 receipt 테이블에 업데이트
      await db.query('UPDATE receipt SET rec_phone = ? WHERE user_id = ?', [
          updatedInfo.rec_phone,
          userId
  ]);
  } catch (error) {
      console.error('Error updating user information in the database:', error);
      throw error;
  }
};


export const deleteUserInfoById = async (userId) => {
  try {
    // 사용자 정보 삭제
    await db.query('DELETE FROM user WHERE user_id = ?', [userId]);

    // 사용자의 영수증 정보 삭제
    await db.query('DELETE FROM receipt WHERE user_id = ?', [userId]);
  } catch (error) {
    console.error('Error deleting user information from the database:', error);
    throw error;
  }
};