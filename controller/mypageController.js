import * as mypageRepository from '../repository/mypageRepository.js'

export async function getMyReview(req, res) {
    const userid = req.params.userid;
    const page = req.query.page;
    const pageItem = req.query.pageItem;
    const startIndex = (page - 1) * pageItem + 1;
    const endIndex = startIndex + 1;
    const result = await mypageRepository.getMyReview({userid, startIndex, endIndex});
    res.json(result);
  };

/**
 * 주문 내역 조회
 */ 
export async function getOrders(req, res) {
    const userId = req.params.userId;
    const orderRows = await mypageRepository.getOrders(userId);
    if(orderRows){
        const orderData = [];
        for (const item of orderRows) {
            const orderId = item.order_id;
            const orderDetailRows = await mypageRepository.getOrderDetails(orderId);
            const orderDetails = orderDetailRows.map(orderDetail => {
                return {
                    order_id: orderDetail.order_id,
                    order_qty: orderDetail.order_qty,
                    alcohol_img1: orderDetail.alcohol_img1,
                    alcohol_name: orderDetail.alcohol_name,
                    alcohol_price: orderDetail.alcohol_price,
                    dc_percent: orderDetail.dc_percent,
                    alcohol_volume: orderDetail.alcohol_volume
                };
            });
            orderData.push({
                orderInfo : item,
                orderAlcohols : orderDetails
            });
        }
        res.json(orderData);
    }
}