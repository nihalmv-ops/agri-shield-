import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './src/config/db.js';
import { notFound, errorHandler } from './src/middleware/errorHandler.js';

// Route imports
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import complaintRoutes from './src/routes/complaintRoutes.js';
import alertRoutes from './src/routes/alertRoutes.js';
import cameraRoutes from './src/routes/cameraRoutes.js';
import activityRoutes from './src/routes/activityRoutes.js';
import officerRoutes from './src/routes/officerRoutes.js';
import uploadRoutes from './src/routes/uploadRoutes.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to MongoDB
connectDB();

// Security & Utility Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

app.use(
  cors({
    origin: '*', // Allow all origins for dev / mobile / multi-client
    credentials: true
  })
);

app.use(morgan('dev'));
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    service: 'AgriShield Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/cameras', cameraRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/officer', officerRoutes);
app.use('/api/upload', uploadRoutes);

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: system-ui, sans-serif; background: #071A14; color: #FFFFFF; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px;">
      <h1 style="color: #10B981; font-size: 2.5rem; margin-bottom: 0.5rem;">AgriShield REST API</h1>
      <p style="color: #34D399; font-size: 1.1rem; margin-top: 0;">Protecting Farmers, Wildlife & Nature</p>
      <div style="background: rgba(6, 59, 42, 0.6); border: 1px solid #10B981; border-radius: 12px; padding: 20px 30px; margin-top: 20px; max-width: 600px; text-align: left;">
        <p><strong>Status:</strong> <span style="color: #10B981;">Online &amp; Connected</span></p>
        <p><strong>Forest Officer Command API:</strong> <code style="color: #34D399;">/api/officer</code></p>
        <p><strong>Agricultural Marketplace API:</strong> <code style="color: #34D399;">/api/products</code></p>
        <p><strong>Wildlife Early Warning API:</strong> <code style="color: #34D399;">/api/alerts</code></p>
        <p><strong>Farmer Grievance API:</strong> <code style="color: #34D399;">/api/complaints</code></p>
        <p><strong>Health Check:</strong> <a href="/api/health" style="color: #34D399;">/api/health</a></p>
      </div>
    </div>
  `);
});

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[AgriShield] Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
  console.log(`[AgriShield] Health check available at http://localhost:${PORT}/api/health`);
});
