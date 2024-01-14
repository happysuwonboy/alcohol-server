import { getPasswordResetToken, updatePassword } from '../repository/passwordresetRespository.js';

// 비밀번호 재설정과 관련된 비즈니스 로직을 처리하는 컨트롤러

export const resetPassword = async (req, res) => {
  const userId = req.params.id;
  const newPassword = req.body.newPassword;

  try {
    // 사용자의 비밀번호 리셋 토큰을 가져옴
    const resetToken = await getPasswordResetToken(userId);

    if (resetToken) {
      // 비밀번호 업데이트
      await updatePassword(userId, newPassword);

      // (선택) 사용한 리셋 토큰을 무효화할 수 있음

      res.json({ success: true, message: '비밀번호 재설정이 완료되었습니다.' });
    } else {
      res.json({ success: false, message: '유효하지 않은 요청이거나 사용자를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('Error in resetPassword controller:', error);
    res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
};
