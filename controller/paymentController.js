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

/**
 * 주문 내역 추가 -> 주문 상품 내역 추가 -> 상품 재고 update -> 장바구니에서 삭제
 */
export async function insertOrder(req, res) {
    const {userId, recId, totalOrderPrice, orderAlcohol} = req.body;

    const result = await paymentRepository.insertOrderInfo({userId, recId, totalOrderPrice});
    if(result === 'ok'){
        for (const alcohol of orderAlcohol) {
            const alcoholId = alcohol.alcohol_id;
            const alcoholQty = alcohol.qty;
            await paymentRepository.insertOrderDetail({alcoholId, alcoholQty});
            await paymentRepository.decreaseAlcoholStock({alcoholId, alcoholQty});
            await paymentRepository.deleteCart({alcoholId});
        }
        res.json(result);
    }
}