import { db } from './../db/database.js';


export async function getAlcoholInfo(alcohol_id) {
  return db
  .execute(`select al.alcohol_id, alcohol_name, alcohol_price, dc_percent, alcohol_type, ABV, alcohol_volume,
                  food, alcohol_comment1, alcohol_comment2, alcohol_img1, alcohol_img2, alcohol_img3, 
                  left(register_date, 10) as register_date, hashtag, flavor_sweet, flavor_sour, 
                  flavor_soda, flavor_body, review_cnt, avg_rate
                  from alcohol al 
                  left outer join 
                  (select od.alcohol_id as alcohol_id, count(review_id) as review_cnt,round(avg(review_star), 1) as avg_rate
                  from order_detail od inner join review r on od.order_detail_id=r.order_detail_id
                  group by od.alcohol_id) ar 
                  on al.alcohol_id = ar.alcohol_id
                  where al.alcohol_id=?`,[alcohol_id])
  .then(result => result[0][0])
  .catch(err => console.log(err))
}

export async function getRecommendAlcohols(alcohol_id) {
  return db
  .execute(`select al.alcohol_id, alcohol_name, alcohol_price, 
            ifnull(review_cnt,0) as review_cnt, ifnull(avg_rate, 0) as avg_rate
            from alcohol al 
            left outer join 
            (select od.alcohol_id as alcohol_id, 
            count(review_id) as review_cnt,round(avg(review_star), 1) as avg_rate 
            from order_detail od inner join review r on od.order_detail_id=r.order_detail_id 
            group by od.alcohol_id) ar 
            on al.alcohol_id = ar.alcohol_id
            where alcohol_type = (select alcohol_type from alcohol where alcohol_id=?) 
            and al.alcohol_id != ?
            order by avg_rate desc, review_cnt desc, al.alcohol_id asc`,[alcohol_id,alcohol_id])
  .then(result => result[0])
  .catch(err => console.log(err))
} 