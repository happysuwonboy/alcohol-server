import * as homeRepository from '../repository/homeRepository.js';

export async function getList(req, res) {
  const condition = req.params.condition
  const result = await homeRepository.getList(condition);
  res.json(result);
};

export async function getReviewList(req, res) {
  const result = await homeRepository.getReviewList();
  res.json(result);
};

export async function getReviewStart(req, res) {
  const alcohol_id = req.params.alcohol_id;
  const result = await homeRepository.getReviewStar(alcohol_id);
  res.json(result);
};
