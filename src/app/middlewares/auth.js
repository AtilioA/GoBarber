import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Deny access if token is not provided
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // Get only the token from authentication header
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.jwt_secret);

    // Put user id inside 'req' JSON
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
