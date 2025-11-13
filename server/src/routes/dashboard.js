const express = require('express');
const router = express.Router();
const { query } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Get dashboard data (no auth required)
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate, baseId, assetTypeId } = req.query;

    let sql = `
      SELECT 
        b.id as base_id,
        b.name as base_name,
        at.id as asset_type_id,
        at.name as asset_type,
        COALESCE(SUM(p.quantity), 0) as purchases,
        COALESCE(SUM(CASE WHEN t.to_base_id = b.id THEN t.quantity ELSE 0 END), 0) as transfers_in,
        COALESCE(SUM(CASE WHEN t.from_base_id = b.id THEN t.quantity ELSE 0 END), 0) as transfers_out,
        COALESCE(SUM(CASE WHEN a.status = 'assigned' THEN a.quantity ELSE 0 END), 0) as assigned,
        COALESCE(SUM(CASE WHEN a.status = 'expended' THEN a.quantity ELSE 0 END), 0) as expended
      FROM bases b
      CROSS JOIN asset_types at
      LEFT JOIN purchases p ON b.id = p.base_id AND at.id = p.asset_type_id
      LEFT JOIN transfers t ON (b.id = t.to_base_id OR b.id = t.from_base_id) AND at.id = t.asset_type_id
      LEFT JOIN assignments a ON b.id = a.base_id AND at.id = a.asset_type_id
      WHERE 1=1
    `;

    const params = [];

    // Date filtering
    if (startDate) {
      sql += ' AND (p.purchase_date >= ? OR t.transfer_date >= ? OR a.assignment_date >= ?)';
      params.push(startDate, startDate, startDate);
    }
    if (endDate) {
      sql += ' AND (p.purchase_date <= ? OR t.transfer_date <= ? OR a.assignment_date <= ?)';
      params.push(endDate, endDate, endDate);
    }

    // Base filtering
    if (baseId) {
      sql += ' AND b.id = ?';
      params.push(baseId);
    }

    // Asset type filtering
    if (assetTypeId) {
      sql += ' AND at.id = ?';
      params.push(assetTypeId);
    }

    sql += ' GROUP BY b.id, b.name, at.id, at.name ORDER BY b.name, at.name';

    const results = await query(sql, params);

    // Calculate opening and closing balances
    const dashboardData = results.map(row => {
      const netMovement = row.purchases + row.transfers_in - row.transfers_out;
      const openingBalance = 100; // This should be calculated from historical data
      const closingBalance = openingBalance + netMovement - row.assigned - row.expended;

      return {
        baseId: row.base_id,
        baseName: row.base_name,
        assetType: row.asset_type,
        openingBalance,
        purchases: row.purchases,
        transfersIn: row.transfers_in,
        transfersOut: row.transfers_out,
        assigned: row.assigned,
        expended: row.expended,
        closingBalance
      };
    });

    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

module.exports = router;
