import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import Product from './models/Product.js';
import Complaint from './models/Complaint.js';
import WildlifeAlert from './models/WildlifeAlert.js';
import CameraTrap from './models/CameraTrap.js';
import ActivityLog from './models/ActivityLog.js';

dotenv.config();

const clearDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/agrishield';
    console.log(`[AgriShield] Connecting to database: ${mongoUri}`);

    let conn;
    try {
      conn = await mongoose.connect(mongoUri);
    } catch (err) {
      console.warn(`[AgriShield] Connection to ${mongoUri} failed: ${err.message}`);
      console.log('[AgriShield] Trying local MongoDB fallback at mongodb://127.0.0.1:27017/agrishield...');
      conn = await mongoose.connect('mongodb://127.0.0.1:27017/agrishield');
    }

    console.log('[AgriShield] Connected. Removing all demo and sample data...');

    const [users, products, complaints, alerts, cameras, logs] = await Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Complaint.deleteMany({}),
      WildlifeAlert.deleteMany({}),
      CameraTrap.deleteMany({}),
      ActivityLog.deleteMany({})
    ]);

    console.log('\n=============================================');
    console.log('🧹 AgriShield Demo Data Cleared Successfully:');
    console.log('=============================================');
    console.log(`- Users deleted:        ${users.deletedCount}`);
    console.log(`- Products deleted:     ${products.deletedCount}`);
    console.log(`- Complaints deleted:   ${complaints.deletedCount}`);
    console.log(`- Alerts deleted:       ${alerts.deletedCount}`);
    console.log(`- Camera traps deleted: ${cameras.deletedCount}`);
    console.log(`- Activity logs deleted:${logs.deletedCount}`);
    console.log('=============================================');
    console.log('Database is now completely clean and ready for real data!\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('[Clear Error]:', error.message);
    process.exit(1);
  }
};

clearDatabase();
