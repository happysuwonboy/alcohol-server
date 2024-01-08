import * as cartRepository from '../repository/cartRepository.js'

/**
 * 회원의 장바구니 리스트 조회
 */ 
export async function getCartList(req, res) {
    const userId = req.params.userId;
    const row = await cartRepository.getCartList(userId);
    res.json(row);
}

/**
 * 장바구니 수량 업데이트
 */
export async function updateQty(req, res) {
    const {userId, alcoholId, checkFlag} = req.params;
    const result = await cartRepository.updateQty({userId, alcoholId, checkFlag});
    res.json(result); 
}

/**
 * 장바구니 상품 삭제
 */
export async function removeCart(req, res) {
    const {userId, alcoholId} = req.params;
    console.log(userId, alcoholId);
    const result = await cartRepository.removeCart({userId, alcoholId}); 
    res.json(result); 
}
