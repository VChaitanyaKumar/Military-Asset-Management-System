const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { testConnection } = require('./src/config/database');
const { requestLogger } = require('./src/middleware/logger');

// Import routes
const authRoutes = require('./src/routes/auth');
const dashboardRoutes = require('./src/routes/dashboard');
const purchasesRoutes = require('./src/routes/purchases');
const transfersRoutes = require('./src/routes/transfers');
const assignmentsRoutes = require('./src/routes/assignments');
const basesRoutes = require('./src/routes/bases');
const assetTypesRoutes = require('./src/routes/assetTypes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'Military Asset Management System API',
    version: '1.0.0',
    status: 'running'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/transfers', transfersRoutes);
app.use('/api/assignments', assignmentsRoutes);
app.use('/api/bases', basesRoutes);
app.use('/api/asset-types', assetTypesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ Failed to connect to database. Please check your .env file.');
      process.exit(1);
    }

    // Start listening
    app.listen(PORT, () => {
      console.log('');
      console.log('🚀 ========================================');
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🚀 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🚀 API URL: http://localhost:${PORT}/api`);
      console.log('🚀 ========================================');
      console.log('');
      console.log('📋 Available endpoints:');
      console.log('   POST   /api/auth/login');
      console.log('   POST   /api/auth/logout');
      console.log('   GET    /api/dashboard');
      console.log('   GET    /api/purchases');
      console.log('   POST   /api/purchases');
      console.log('   GET    /api/transfers');
      console.log('   POST   /api/transfers');
      console.log('   GET    /api/assignments');
      console.log('   POST   /api/assignments');
      console.log('   PATCH  /api/assignments/:id/expend');
      console.log('   GET    /api/bases');
      console.log('   GET    /api/asset-types');
      console.log('');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
