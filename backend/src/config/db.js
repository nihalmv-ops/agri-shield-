import mongoose from 'mongoose';

export const connectDB = async () => {
  const primaryUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/agrishield';

  try {
    const conn = await mongoose.connect(primaryUri);
    console.log(`[MongoDB] Database connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection failed to ${primaryUri}: ${error.message}`);

    // If Atlas SRV query fails due to local Windows DNS / ISP blockage, fallback to local MongoDB
    if (primaryUri.startsWith('mongodb+srv://') && error.message.includes('querySrv')) {
      console.warn('[MongoDB] Windows/ISP DNS blocked MongoDB Atlas SRV lookup.');
      console.log('[MongoDB] Attempting fallback to local MongoDB service (mongodb://127.0.0.1:27017/agrishield)...');

      try {
        const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/agrishield');
        console.log(`[MongoDB] Fallback connected to local database: ${localConn.connection.host}/${localConn.connection.name}`);
        return localConn;
      } catch (localError) {
        console.error(`[MongoDB] Local fallback error: ${localError.message}`);
      }
    }

    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
