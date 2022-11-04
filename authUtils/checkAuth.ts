import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';

export const checkAuth = (req: NextApiRequest) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        return user;
      } catch (err) {
        throw 'Invalid or Expired token, please refresh the page';
      }
    } else {
      throw "Authentication token must be 'Bearer [token]'";
    }
  } else {
    throw 'Authentication header must be provided';
  }
};
