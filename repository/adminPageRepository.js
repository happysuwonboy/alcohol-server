import {db} from '../db/database.js';

export async function getAlcoholList({startIndex, endIndex}) {
  return db
  .execute(`select * from (
              select
                row_number() over (order by register_date) as rno,
                count(*) over () as total_cnt,
                alcohol_id,
                alcohol_name, 
                alcohol_price, 
                dc_percent, 
                alcohol_type,
                ABV,
                alcohol_volume,
                food,
                alcohol_comment1,
                alcohol_comment2,
                alcohol_img1,
                alcohol_img2,
                alcohol_img3,
                date_format(register_date, '%y-%m-%d') as register_date,
                flavor_sour,
                flavor_soda,
                flavor_sweet,
                flavor_body,
                hashtag,
                stock
              from alcohol ) as alcohol_result
              where rno between ${startIndex} and ${endIndex}`)
  .then(rows => rows[0]);
}