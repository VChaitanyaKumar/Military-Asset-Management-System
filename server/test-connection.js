const mysql = require('mysql2/promise');

const passwords = ['Chaitanya@2004', '', 'root', 'password', 'mysql', 'admin', '123456', 'password123'];

async function testPasswords() {
  console.log('Testing MySQL passwords...\n');
  
  for (const pwd of passwords) {
    try {
      const connection = await mysql.createConnection({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: pwd,
        database: 'military_assets'
      });
      
      console.log(`✅ SUCCESS! Password is: "${pwd}"`);
      console.log(`\nUpdate your server/.env file with:`);
      console.log(`DB_PASSWORD=${pwd}`);
      
      await connection.end();
      return;
    } catch (error) {
      console.log(`❌ Not: "${pwd}"`);
    }
  }
  
  console.log('\n⚠️  None of the common passwords worked.');
  console.log('You need to reset your MySQL root password.');
}

testPasswords();
