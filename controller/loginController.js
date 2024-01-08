import * as repository from '../repository/loginRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function getLogin(req, res) {
    const { id, pass } = req.body;

    try {
        const result = await repository.getLogin(id);
        result.login_result = false;

        if (result.cnt === 1) {
            if (await bcrypt.compare(pass, result.user_passwd)) {
                result.login_result = true; // 로그인 성공

                // jwt 토큰 생성
                const token = jwt.sign({ id: id, user_role: result.user_role }, '58Ua|!{@>3{*');
                result.token = token;
            }
        }

        res.json(result); // 토큰 전송
    } catch (error) {
        console.error("로그인 처리 중 오류:", error);
        res.status(500).json({ login_result: false, error: "로그인 중 오류가 발생했습니다" });
    }
}