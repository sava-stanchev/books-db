import pool from './pool.js';

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

const createUser = async (user) => {
    const userExist = await db.query(`SELECT * FROM users AS u WHERE u.user_name = ?`, [user.user_name]);
    if (userExist[0]) {
        return {
            error: true,
            response: {
                error: 'username should be unique!'
            }
        }
    }
    const sql = `
    INSERT INTO users () 
    VALUES (?, ?, ?, ?, ?, ?)
    `; // да се допише
    const result = await db.query(sql, []);

}

export default {
    getWithRole,
    createUser
}