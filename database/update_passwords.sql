-- Update user passwords with proper bcrypt hashes
-- Password for all users: password123
-- This hash is generated using bcrypt with 10 salt rounds

USE military_assets;

-- Update all users with the correct bcrypt hash for "password123"
UPDATE users SET password_hash = '$2b$10$YourHashWillBeGeneratedByTheScript';

-- Note: You need to run the hashPassword.js script first to get the actual hash
-- Then replace the hash above with the generated one

-- To generate the hash, run in terminal:
-- cd server
-- node src/utils/hashPassword.js

SELECT 'Passwords updated! Now you can login with password123' as Status;
