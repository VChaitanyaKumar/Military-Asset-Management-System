const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Get all asset types (no auth required)
router.get('/', async (req, res) => {
  try {
    const sql = 'SELECT * FROM asset_types ORDER BY name';
    const results = await query(sql);
    res.json(results);
  } catch (error) {
    console.error('Get asset types error:', error);
    res.status(500).json({ error: 'Failed to fetch asset types' });
  }
});

module.exports = router;
