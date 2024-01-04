import * as homeRepository from '../repository/homeRepository.js';

export async function getList(req, res) {
  const colum = req.query.colum;
  const sign = req.query.sign;
  const condition = req.query.condition;
  const number = parseInt(condition)
  const result = await homeRepository.getList({colum, sign, number});
  res.json(result);
};

export async function getReviewList(req, res) {
  const result = await homeRepository.getReviewList();
  res.json(result);
};


