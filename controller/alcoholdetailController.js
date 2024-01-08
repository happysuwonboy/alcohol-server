import * as alcoholdetailRepository from '../repository/alcoholdetailRepository.js';

export async function getAlcoholInfo(req,res) {
  const alcohol_id = req.params.alcohol_id;
  try {
    const result = await alcoholdetailRepository.getAlcoholInfo(alcohol_id);
    const data = {...result, ABV : parseFloat(result.ABV) || null, avg_rate : parseFloat(result?.avg_rate) || null}
    res.status(200).send(data)
  } catch (err) {
    console.log(err);
    res.status(404).send({message:'data not found'})
  }
}

export async function getRecommendAlcohols(req,res) {
  const alcohol_id = req.params.alcohol_id;
  const rows = await alcoholdetailRepository.getRecommendAlcohols(alcohol_id);
  try {
    res.status(200).send(rows)
  } catch(err) {
    console.log(err);
    res.status(404).send({message : 'error'})
  }
}

export async function getReviewList(req, res) {
  const orderBy = req.query.orderBy;
  const colum = req.query.colum;
  const page = req.query.page;
  const pageItem = req.query.pageItem;
  const startIndex = (page - 1) * pageItem + 1;
  const endIndex = startIndex + 1
  const alcohol_id = req.params.alcohol_id;
  const result = await alcoholdetailRepository.getReviewList({orderBy, colum, alcohol_id, startIndex, endIndex});
  res.json(result);
};