const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/rbac');
const { auditLogger } = require('../middleware/logger');

// Get all purchases (no auth required)
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, baseId, assetTypeId } = req.query;

    let sql = `
      SELECT 
        p.*,
        b.name as base_name,
        at.name as asset_type,
        u.name as created_by_name
      FROM purchases p
      JOIN bases b ON p.base_id = b.id
      JOIN asset_types at ON p.asset_type_id = at.id
      JOIN users u ON p.created_by = u.id
      WHERE 1=1
    `;

    const params = [];

    if (startDate) {
      sql += ' AND p.purchase_date >= ?';
      params.push(startDate);
    }
    if (endDate) {
      sql += ' AND p.purchase_date <= ?';
      params.push(endDate);
    }
    if (baseId) {
      sql += ' AND p.base_id = ?';
      params.push(baseId);
    }
    if (assetTypeId) {
      sql += ' AND p.asset_type_id = ?';
      params.push(assetTypeId);
    }

    sql += ' ORDER BY p.purchase_date DESC';

    const results = await query(sql, params);
    res.json(results);
  } catch (error) {
    console.error('Get purchases error:', error);
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
});

// Create purchase (no auth required)
router.post('/', async (req, res) => {
  try {
    const { baseId, assetTypeId, vendor, quantity, unitCost, totalCost, purchaseDate } = req.body;

    if (!baseId || !assetTypeId || !vendor || !quantity || !unitCost || !purchaseDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = `
      INSERT INTO purchases (base_id, asset_type_id, vendor, quantity, unit_cost, total_cost, purchase_date, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      baseId,
      assetTypeId,
      vendor,
      quantity,
      unitCost,
      totalCost,
      purchaseDate,
      1
    ]);

    // Log the action
    await auditLogger(
      1,
      'CREATE',
      'purchases',
      result.insertId,
      { baseId, assetTypeId, vendor, quantity, unitCost, totalCost, purchaseDate },
      req.ip
    );

    res.status(201).json({
      message: 'Purchase created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Create purchase error:', error);
    res.status(500).json({ error: 'Failed to create purchase' });
  }
});

// Delete purchase
router.delete('/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'DELETE FROM purchases WHERE id = ?';
    await query(sql, [id]);

    await auditLogger(req.user.id, 'DELETE', 'purchases', id, {}, req.ip);

    res.json({ message: 'Purchase deleted successfully' });
  } catch (error) {
    console.error('Delete purchase error:', error);
    res.status(500).json({ error: 'Failed to delete purchase' });
  }
});

module.exports = router;
