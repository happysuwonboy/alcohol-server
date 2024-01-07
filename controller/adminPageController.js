import * as  adminPageRepository from '../repository/adminPageRepository.js'


export async function getAlcoholList(req, res) {
  const page = req.params.page;
  const endIndex = page * 10;
  const startIndex = endIndex -9;
  const rows = await adminPageRepository.getAlcoholList({startIndex, endIndex});
  res.json(rows);
}