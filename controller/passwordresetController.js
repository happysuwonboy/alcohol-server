import { updatePassword } from '../repository/passwordresetRespository.js';

export const resetPassword = async (req, res) => {
  const userId = req.params.id;
  const newPassword = req.body.newPassword;

  try {
    // 비밀번호 업데이트
    await updatePassword(userId, newPassword);

    res.json({ success: true, message: '비밀번호 재설정이 완료되었습니다.' });
  } catch (error) {
    console.error('Error in resetPassword controller:', error);
    res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
};
