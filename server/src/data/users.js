import pool from './pool.js';

export const getAllUsers = async () => {
    return await pool.query(`
      SELECT * FROM users AS u
      WHERE u.is_deleted != 1
    `);
  };

const getWithRole = async (username) => {
    const sql = `
        SELECT u.users_id, u.user_name, u.password, r.name as role
        FROM users u
        JOIN roles r ON u.roleId = r.id
        WHERE u.user_name = ?
    `;

    const result = await pool.query(sql, [username]);

    return result[0];
}

export const createUser = async (user) => {
    
    const userExist = await pool.query(`SELECT * FROM users AS u WHERE u.user_name = ?`, [user.userName]);
    if (userExist[0]) {
        return {
            error: true,
            response: {
                error: 'username should be unique!'
            }
        }
    }
    // console.log('HI HI HI');
    const sqlNewUser = `
    INSERT INTO users (user_name, password, first_name, last_name, user_age, e_mail, is_admin, is_deleted, is_banned, gender) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const result = await pool.query(sqlNewUser, [user.userName, user.password, user.firstName, user.lastName, user.userAge, user.e_mail, user.is_admin, user.is_deleted, user.is_banned, user.gender]);
    console.log('----------------');
    console.log(result);
    console.log('----------------');
    const sql = `SELECT u.user_name, u.first_name, u.last_name
                FROM users AS u
                WHERE u.users_id = ?
    `;

    const createdUser = (await pool.query(sql, [result.insertId]))[0];

    return{
        success: true,
        response: createdUser,
    }
}

export default {
    getWithRole,
    createUser,
    getAllUsers
}