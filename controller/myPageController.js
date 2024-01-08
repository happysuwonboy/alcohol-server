import * as repository from '../repository/myPageRepository.js';

export async function getMyReview(req, res) {
  const userid = req.params.userid;
  const page = req.query.page;
  const pageItem = req.query.pageItem;
  const startIndex = (page - 1) * pageItem + 1;
  const endIndex = startIndex + 1;
  const result = await repository.getMyReview({userid, startIndex, endIndex});
  res.json(result);
};