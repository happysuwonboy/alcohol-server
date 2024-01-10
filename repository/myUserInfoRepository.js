// myUserInfoRepository.js

import { db } from '../db/database.js';
import bcrypt from 'bcrypt';

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
        if (updatedInfo.user_password) {
            // Hash the new password before updating
            updatedInfo.user_password = bcrypt.hashSync(updatedInfo.user_password, 10);
        }

        await db.query('UPDATE user SET user_email = ?, user_phone = ?, user_passwd = ? WHERE user_id = ?', [
            updatedInfo.user_email,
            updatedInfo.user_phone,
            updatedInfo.user_password,
            userId
        ]);

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
        await db.query('DELETE FROM user WHERE user_id = ?', [userId]);
        await db.query('DELETE FROM receipt WHERE user_id = ?', [userId]);
    } catch (error) {
        console.error('Error deleting user information from the database:', error);
        throw error;
    }
};
