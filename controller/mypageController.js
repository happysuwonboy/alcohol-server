import * as mypageRepository from '../repository/mypageRepository.js'

// 사용자의 전체 리뷰 요청
export async function getMyAllReview(req, res) {
    const userid = req.params.userid;
    const result = await mypageRepository.getMyAllReview(userid);
    res.json(result);
};

// 사용자의 리뷰 중 2개씩 요청
export async function getMyReview(req, res) {
    const userid = req.params.userid;
    const page = req.query.page;
    const pageItem = req.query.pageItem;
    const searchTerm = req.query.searchTerm;
    const selectOption = req.query.selectOption;
    const startIndex = (page - 1) * pageItem + 1;
    const endIndex = startIndex + 1;
    const result = await mypageRepository.getMyReview({ userid, startIndex, endIndex, searchTerm, selectOption });
    res.json(result);
};

// 전체 리뷰 삭제 요청
export async function deleteCheckedMyReview(req, res) {
    const { checkedReview } = req.body;
    const result = await mypageRepository.deleteCheckedMyReview(checkedReview);
    res.json(result);
};

// 각 리뷰 삭제 요청
export async function deleteMyReview(req, res) {
    const reviewid = req.params.review_id;
    const result = await mypageRepository.deleteMyReview(reviewid);
    res.json(result);
};

export async function updateMyReview(req, res) {
    const { id, content, star } = req.body;
    const imagefile = req.file?.filename || null;
    const result = await mypageRepository.updateMyReview({ id, imagefile, content, star });
    res.json(result);
};

export async function insertMyReview(req, res) {
    const id = req.params.userId;
    const {orderDetailId, content, star } = req.body;
    const imagefile = req.file?.filename || null;
    const result1 = await mypageRepository.insertMyReview({ id, orderDetailId, imagefile, content, star });
    const result2 = await mypageRepository.insertUpdateReview(orderDetailId);
    let result = '';
    if(result1 === 'insert ok' && result2 === 'insert update ok') {
        result = 'ok';
    }
    res.json(result);
};

export async function getCreateReview(req, res) {
    const userid = req.params.userid;
    const page = req.query.page;
    const pageItem = req.query.pageItem;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const searchTerm = req.query.searchTerm;
    const index = (page - 1) * pageItem + 1;
    const orderRows = await mypageRepository.getCreateReview({ userid, startDate, endDate, index });
    if (orderRows) {
        const reviewData = [];
        for (const item of orderRows) {
            const orderId = item.order_id;
            const reviewDetailRows = await mypageRepository.getCreateReviewDetails({ orderId, searchTerm });
            const reviewDetails = reviewDetailRows.map(reviewDetail => {
                return {
                    order_id: reviewDetail.order_id,
                    order_qty: reviewDetail.order_qty,
                    alcohol_img1: reviewDetail.alcohol_img1,
                    alcohol_name: reviewDetail.alcohol_name,
                    alcohol_price: reviewDetail.alcohol_price,
                    dc_percent: reviewDetail.dc_percent,
                    alcohol_volume: reviewDetail.alcohol_volume,
                    review_id: reviewDetail.review_id,
                    register_review: reviewDetail.register_review,
                    alcohol_id: reviewDetail.alcohol_id,
                    order_detail_id: reviewDetail.order_detail_id
                };
            });
            reviewData.push({
                reviewInfo: item,
                reviewAlcohols: reviewDetails
            });
        }
        res.json(reviewData);
    }
};

/**
 * 주문 내역 조회
 */
export async function getOrders(req, res) {
    const userId = req.params.userId;
    const orderRows = await mypageRepository.getOrders(userId);
    if (orderRows) {
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
                orderInfo: item,
                orderAlcohols: orderDetails
            });
        }
        res.json(orderData);
    }
}