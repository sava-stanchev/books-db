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

export default {
    getWithRole
}
