import * as alcoholdetailRepository from '../repository/alcoholdetailRepository.js';

export async function getAlcoholInfo(req,res) {
  const alcohol_id = req.params.alcohol_id;
  try {
    const result = await alcoholdetailRepository.getAlcoholInfo(alcohol_id);
    const data = {...result, ABV : parseFloat(result.ABV), avg_rate : parseFloat(result.avg_rate)}
    res.status(200).send(data)
  } catch (err) {
    console.log(err);
    res.status(404).send({message:'data not found'})
  }
}