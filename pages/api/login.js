import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
import { loginValidator } from '../../authUtils/validate';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const generateToken = (user) => {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        userName: user.userName,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '6h' }
    );
  };

  const { userName, password } = req.body;

  await dbConnect();

  try {
    const { errors, valid } = loginValidator(userName, password);

    if (!valid) {
      throw errors;
    }
    const user = await User.findOne({ userName });

    if (!user) {
      errors.userInputError = 'User not found';
      throw errors;
    }

    const bcryptMatch = await bcrypt.compare(password, user.password);
    if (!bcryptMatch) {
      errors.general = 'Wrong credentials';
      throw errors;
    }
    const token = generateToken(user);
    const userData = { id: user._id, userName: user.userName, token };

    res.status(200).json({ success: true, userData });
  } catch (errors) {
    res.status(400).json({ success: false, errors });
  }
}
