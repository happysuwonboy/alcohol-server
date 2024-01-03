import * as paymentRepository from '../repository/paymentRepository.js'

/**
 * 주문할 상품 정보 조회
 */
export async function getOrderAlcoholInfo(req, res) {
    const userId = req.query.userId;
    const checked = (req.query.checked).map(id => `'${id}'`).join(',');
    const rows = await paymentRepository.getOrderAlcoholInfo({userId, checked});
    res.json(rows);
}