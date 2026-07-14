import mysql from 'mysql2/promise';
import 'dotenv/config';

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const [rows] = await conn.execute('SHOW TABLES');
console.log('Tables in database:');
rows.forEach(r => console.log(' -', Object.values(r)[0]));
await conn.end();
