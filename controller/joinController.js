import * as repository from '../repository/joinRepository.js';

export async function getIdCheck(req, res) {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: 'ID parameter is missing' });
  }

  try {
    const result = await repository.getIdCheck(id);
    res.json(result);
  } catch (error) {
    console.error('ID 확인 중 오류 발생:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function createUser(req, res) {
  const {userid, name, password, birthdate, email, phone, fullAddress} = req.body;
  const result = await repository.createUser(userid, name, password, birthdate, email, phone, fullAddress);
  res.json(result);
}