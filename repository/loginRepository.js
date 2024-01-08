import {db} from '../db/database.js';

export async function getLogin(id){
  const sql = `    SELECT 
  COUNT(user_passwd) AS cnt, 
  ANY_VALUE(user_passwd) AS user_passwd,
  ANY_VALUE(user_role) AS user_role 
FROM user 
WHERE user_id=?
`;

  return db
        .execute(sql, [id])
        .then((rows) => rows[0][0]);  //{cnt:1, pass:'dfdfd~~~'}
}