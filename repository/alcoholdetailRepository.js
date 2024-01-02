import { db } from './../db/database.js';


export async function getAlcoholInfo(alcohol_id) {
  return db
  .execute(`select alcohol_id, alcohol_name, alcohol_price, dc_percent, alcohol_type, ABV, alcohol_volume,
            food, alcohol_comment1, alcohol_comment2, alcohol_img1, alcohol_img2, alcohol_img3, 
            left(register_date, 10) as register_date, hashtag,
            flavor_sweet, flavor_sour, flavor_soda, flavor_body,
            (select round(avg(review_star), 1)
            from order_detail od inner join review r on od.order_detail_id=r.order_detail_id
            where od.alcohol_id=?) as avg_rate
            from alcohol where alcohol_id=?`,[alcohol_id,alcohol_id])
  .then(result => result[0][0])
  .catch(err => console.log(err))
}