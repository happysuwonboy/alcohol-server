import {findUserId} from '../repository/findidRepository.js';

export const findId = async (req, res) => {
  const { name, phone } = req.body;

  try {
    const foundIds = await findUserId(name, phone);

    if (foundIds.length > 0) {
      res.status(200).json({ data: foundIds });
    } else {
      res.status(404).json({ error: '일치하는 사용자를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('ID 찾기 오류:', error);
    res.status(500).json({ error: '요청을 처리하는 중에 오류가 발생했습니다.' });
  }
};