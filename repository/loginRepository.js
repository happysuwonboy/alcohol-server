import {db} from '../db/database.js';

export async function getLogin(id){
  const sql = `select count(user_passwd) as cnt, ANY_VALUE(user_passwd) as user_passwd 
                  from user where user_id=?`;

  return db
        .execute(sql, [id])
        .then((rows) => rows[0][0]);  //{cnt:1, pass:'dfdfd~~~'}
}