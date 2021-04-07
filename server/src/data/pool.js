import mariadb from 'mariadb';

const pool = mariadb.createPool({
  host: 'localhost',
  port: '5555',
  user: 'root',
  password: 'root',
  database: 'librarydb'
});

export default pool;
