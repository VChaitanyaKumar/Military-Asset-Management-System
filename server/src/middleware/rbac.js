// Role-Based Access Control Middleware

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'Access denied. Insufficient permissions.',
        requiredRoles: allowedRoles,
        userRole: req.user.role
      });
    }

    next();
  };
};

// Check if user has access to specific base
const checkBaseAccess = (req, res, next) => {
  const { role, baseId } = req.user;
  const requestedBaseId = parseInt(req.params.baseId || req.body.baseId || req.query.baseId);

  // Admin has access to all bases
  if (role === 'admin') {
    return next();
  }

  // Commander can only access their own base
  if (role === 'commander' && baseId !== requestedBaseId) {
    return res.status(403).json({ 
      error: 'Access denied. You can only access your assigned base.' 
    });
  }

  next();
};

module.exports = {
  checkRole,
  checkBaseAccess
};
