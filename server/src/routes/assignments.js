const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/rbac');
const { auditLogger } = require('../middleware/logger');

// Get all assignments (no auth required)
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, baseId, status } = req.query;

    let sql = `
      SELECT 
        a.*,
        b.name as base_name,
        at.name as asset_type,
        u.name as created_by_name
      FROM assignments a
      JOIN bases b ON a.base_id = b.id
      JOIN asset_types at ON a.asset_type_id = at.id
      JOIN users u ON a.created_by = u.id
      WHERE 1=1
    `;

    const params = [];

    if (startDate) {
      sql += ' AND a.assignment_date >= ?';
      params.push(startDate);
    }
    if (endDate) {
      sql += ' AND a.assignment_date <= ?';
      params.push(endDate);
    }
    if (baseId) {
      sql += ' AND a.base_id = ?';
      params.push(baseId);
    }
    if (status) {
      sql += ' AND a.status = ?';
      params.push(status);
    }

    sql += ' ORDER BY a.assignment_date DESC';

    const results = await query(sql, params);
    res.json(results);
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

// Create assignment (no auth required)
router.post('/', async (req, res) => {
  try {
    const { baseId, assetTypeId, personnelName, personnelRank, personnelId, quantity, assignmentDate, purpose } = req.body;

    if (!baseId || !assetTypeId || !personnelName || !personnelRank || !personnelId || !quantity || !assignmentDate || !purpose) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = `
      INSERT INTO assignments (base_id, asset_type_id, personnel_name, personnel_rank, personnel_id, quantity, assignment_date, purpose, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(sql, [
      baseId,
      assetTypeId,
      personnelName,
      personnelRank,
      personnelId,
      quantity,
      assignmentDate,
      purpose,
      1
    ]);

    await auditLogger(
      1,
      'CREATE',
      'assignments',
      result.insertId,
      { baseId, assetTypeId, personnelName, personnelRank, personnelId, quantity, assignmentDate, purpose },
      req.ip
    );

    res.status(201).json({
      message: 'Assignment created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Create assignment error:', error);
    res.status(500).json({ error: 'Failed to create assignment' });
  }
});

// Mark assignment as expended (no auth required)
router.patch('/:id/expend', async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'UPDATE assignments SET status = ? WHERE id = ?';
    await query(sql, ['expended', id]);

    await auditLogger(1, 'UPDATE', 'assignments', id, { status: 'expended' }, req.ip);

    res.json({ message: 'Assignment marked as expended' });
  } catch (error) {
    console.error('Mark expended error:', error);
    res.status(500).json({ error: 'Failed to mark assignment as expended' });
  }
});

// Delete assignment
router.delete('/:id', authenticateToken, checkRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'DELETE FROM assignments WHERE id = ?';
    await query(sql, [id]);

    await auditLogger(req.user.id, 'DELETE', 'assignments', id, {}, req.ip);

    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Delete assignment error:', error);
    res.status(500).json({ error: 'Failed to delete assignment' });
  }
});

module.exports = router;
