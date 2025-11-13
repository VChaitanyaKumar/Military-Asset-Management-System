const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/rbac');
const { auditLogger } = require('../middleware/logger');

// Get all transfers (no auth required)
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, baseId } = req.query;

    let sql = `
      SELECT 
        t.*,
        b1.name as from_base_name,
        b2.name as to_base_name,
        at.name as asset_type,
        u.name as created_by_name
      FROM transfers t
      JOIN bases b1 ON t.from_base_id = b1.id
      JOIN bases b2 ON t.to_base_id = b2.id
      JOIN asset_types at ON t.asset_type_id = at.id
      JOIN users u ON t.created_by = u.id
      WHERE 1=1
    `;

    const params = [];

    if (startDate) {
      sql += ' AND t.transfer_date >= ?';
      params.push(startDate);
    }
    if (endDate) {
      sql += ' AND t.transfer_date <= ?';
      params.push(endDate);
    }
    if (baseId) {
      sql += ' AND (t.from_base_id = ? OR t.to_base_id = ?)';
      params.push(baseId, baseId);
    }

    sql += ' ORDER BY t.transfer_date DESC';

    const results = await query(sql, params);
    res.json(results);
  } catch (error) {
    console.error('Get transfers error:', error);
    res.status(500).json({ error: 'Failed to fetch transfers' });
  }
});

// Create transfer (no auth required)
router.post('/', async (req, res) => {
  try {
    const { fromBaseId, toBaseId, assetTypeId, quantity, authorizedOfficer, transferDate, remarks } = req.body;

    if (!fromBaseId || !toBaseId || !assetTypeId || !quantity || !authorizedOfficer || !transferDate) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    if (fromBaseId === toBaseId) {
      return res.status(400).json({ error: 'Source and destination bases cannot be the same' });
    }

    const sql = `
      INSERT INTO transfers (from_base_id, to_base_id, asset_type_id, quantity, authorized_officer, transfer_date, remarks, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      fromBaseId,
      toBaseId,
      assetTypeId,
      quantity,
      authorizedOfficer,
      transferDate,
      remarks,
      1
    ]);

    await auditLogger(
      1,
      'CREATE',
      'transfers',
      result.insertId,
      { fromBaseId, toBaseId, assetTypeId, quantity, authorizedOfficer, transferDate, remarks },
      req.ip
    );

    res.status(201).json({
      message: 'Transfer created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Create transfer error:', error);
    res.status(500).json({ error: 'Failed to create transfer' });
  }
});

// Delete transfer
router.delete('/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'DELETE FROM transfers WHERE id = ?';
    await query(sql, [id]);

    await auditLogger(req.user.id, 'DELETE', 'transfers', id, {}, req.ip);

    res.json({ message: 'Transfer deleted successfully' });
  } catch (error) {
    console.error('Delete transfer error:', error);
    res.status(500).json({ error: 'Failed to delete transfer' });
  }
});

module.exports = router;
