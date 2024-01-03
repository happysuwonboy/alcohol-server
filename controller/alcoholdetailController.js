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