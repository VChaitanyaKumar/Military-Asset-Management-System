<<<<<<< HEAD
const { query } = require('../config/database');

// Log all transactions to audit_logs table
const auditLogger = async (userId, action, tableName, recordId, details, ipAddress) => {
  try {
    const sql = `
      INSERT INTO audit_logs (user_id, action, table_name, record_id, details, ip_address)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await query(sql, [
      userId,
      action,
      tableName,
      recordId,
      JSON.stringify(details),
      ipAddress
    ]);
  } catch (error) {
    console.error('Audit logging error:', error);
  }
};

// Middleware to log API requests
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

module.exports = {
  auditLogger,
  requestLogger
};
=======
const { query } = require('../config/database');

// Log all transactions to audit_logs table
const auditLogger = async (userId, action, tableName, recordId, details, ipAddress) => {
  try {
    const sql = `
      INSERT INTO audit_logs (user_id, action, table_name, record_id, details, ip_address)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await query(sql, [
      userId,
      action,
      tableName,
      recordId,
      JSON.stringify(details),
      ipAddress
    ]);
  } catch (error) {
    console.error('Audit logging error:', error);
  }
};

// Middleware to log API requests
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

module.exports = {
  auditLogger,
  requestLogger
};
>>>>>>> c6cf95a602ff79e08105c42299894920e05a36ac
