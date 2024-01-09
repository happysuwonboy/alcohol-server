import { getUserInfoById } from '../repository/myUserInfoRepository.js';

export const getUserInfo = async (req, res) => {
    const userId = req.params.userId; // 또는 클라이언트에서 요청 시 전달되는 방법에 따라서 변경 가능
    try {
        const userInfo = await getUserInfoById(userId);
        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

import { updateUserInfoById } from '../repository/myUserInfoRepository.js';

export const updateUserInfo = async (req, res) => {
    const userId = req.params.userId;
    const { user_email, user_phone,rec_phone } = req.body;

    try {
        // 여기에서 필요한 유효성 검사 등을 수행할 수 있습니다.

        // 사용자 정보 업데이트
        await updateUserInfoById(userId, { user_email, user_phone,rec_phone });

        // 업데이트된 사용자 정보 반환
        const updatedUserInfo = await getUserInfoById(userId);
        res.status(200).json(updatedUserInfo);
    } catch (error) {
        console.error('Error updating user information:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

import { deleteUserInfoById } from '../repository/myUserInfoRepository.js';

export const deleteUserInfo = async (req, res) => {
  const userId = req.params.userId;

  try {
    // 사용자 정보 삭제
    await deleteUserInfoById(userId);

    res.status(200).json({ message: 'User information deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};