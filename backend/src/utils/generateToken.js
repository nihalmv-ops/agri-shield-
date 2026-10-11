import jwt from 'jsonwebtoken';

export const generateToken = (id, role = 'user') => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'agrishield_jwt_secret_dev_key_2026',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

