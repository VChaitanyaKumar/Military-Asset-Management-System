<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');
const { auditLogger } = require('../middleware/logger');

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Get user from database
    const sql = 'SELECT * FROM users WHERE email = ?';
    const users = await query(sql, [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = users[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        baseId: user.base_id
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Log login
    await auditLogger(user.id, 'LOGIN', 'users', user.id, { email }, req.ip);

    // Return token and user info
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        baseId: user.base_id
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await auditLogger(decoded.id, 'LOGOUT', 'users', decoded.id, {}, req.ip);
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.json({ message: 'Logged out' });
  }
});

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, baseId } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const sql = 'INSERT INTO users (name, email, password_hash, role, base_id) VALUES (?, ?, ?, ?, ?)';
    const result = await query(sql, [name, email, passwordHash, role, baseId || null]);

    await auditLogger(result.insertId, 'SIGNUP', 'users', result.insertId, { email, role }, req.ip);

    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const users = await query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }

    // In production, send actual email with reset link
    // For now, just log it
    console.log(`Password reset requested for: ${email}`);
    
    res.json({ message: 'Password reset link sent to email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');
const { auditLogger } = require('../middleware/logger');

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Get user from database
    const sql = 'SELECT * FROM users WHERE email = ?';
    const users = await query(sql, [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = users[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        baseId: user.base_id
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // Log login
    await auditLogger(user.id, 'LOGIN', 'users', user.id, { email }, req.ip);

    // Return token and user info
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        baseId: user.base_id
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      await auditLogger(decoded.id, 'LOGOUT', 'users', decoded.id, {}, req.ip);
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.json({ message: 'Logged out' });
  }
});

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, baseId } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Insert user
    const sql = 'INSERT INTO users (name, email, password_hash, role, base_id) VALUES (?, ?, ?, ?, ?)';
    const result = await query(sql, [name, email, passwordHash, role, baseId || null]);

    await auditLogger(result.insertId, 'SIGNUP', 'users', result.insertId, { email, role }, req.ip);

    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to create account' });
  }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const users = await query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }

    // In production, send actual email with reset link
    // For now, just log it
    console.log(`Password reset requested for: ${email}`);
    
    res.json({ message: 'Password reset link sent to email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to process request' });
  }
});

module.exports = router;
>>>>>>> c6cf95a602ff79e08105c42299894920e05a36ac
