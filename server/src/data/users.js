import pool from './pool.js';

const getWithRole = async (username) => {
    const sql = `
        SELECT u.id, u.username, u.password, r.name as role
        FROM users u
        JOIN roles r ON u.roleId = r.id
        WHERE u.username = ?
    `;

    const result = await pool.query(sql, [username]);

    return result[0];
}

export default {
    getWithRole
}
