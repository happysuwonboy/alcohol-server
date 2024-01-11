// findpwController.js

import { findPw } from '../repository/findpwRepository.js';
import nodemailer from 'nodemailer';

export const findPassword = async (req, res) => {
  const { email, userId } = req.body;

  try {
    const user_id = await findPw(email, userId);

    if (user_id) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sooldamtest@gmail.com',
          pass: 'mzyx xmds rgwv fdae',
        },
      });

      const mailOptions = {
        from: 'sooldamtest@gmail.com',
        to: email, // 변경된 사용자 정보에 맞게 수정
        subject: '비밀번호 재설정',
        html: `<p>비밀번호 재설정 링크: <a href="http://localhost:3000/find/pw/${user_id}">클릭하세요</a></p>`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: '이메일을 확인해주세요.' });
    } else {
      res.status(404).json({ message: '일치하는 사용자 정보를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('비밀번호 찾기 중 오류 발생:', error);
    res.status(500).json({ message: '오류가 발생했습니다.' });
  }
};
