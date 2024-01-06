import * as  adminPageRepository from '../repository/adminPageRepository.js'


export async function getAlcoholList(req, res) {
  const rows = await adminPageRepository.getAlcoholList();
  res.json(rows);
}