const bcrypt = require('bcrypt');

// Utility to hash passwords
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Generate hashes for default password
const generateDefaultHashes = async () => {
  const password = 'password123';
  const hash = await hashPassword(password);
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nUse this hash in your database setup.sql file');
};

// Run if called directly
if (require.main === module) {
  generateDefaultHashes();
}

module.exports = { hashPassword };
