import {db} from '../db/database.js';

export const findUserId = async (name, phone) => {
  try {
    const [rows] = await db.query('SELECT user_id FROM user WHERE user_name = ? AND user_phone = ?', [name, phone]);
    return rows;
  } catch (error) {
    throw error;
  }
};
