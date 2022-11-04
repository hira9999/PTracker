import { registerValidator } from '../../authUtils/validate';
import dbConnect from '../../lib/dbConnect';
import User from '../../models/User';
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

  const {
    body: { userName, password, email, confirmPassword },
  } = req;

  await dbConnect();

  try {
    const { errors, valid } = registerValidator(
      userName,
      password,
      confirmPassword,
      email
    );

    if (!valid) {
      throw errors;
    }

    const user = await User.findOne({ userName });
    if (user) {
      errors.userInputError = 'This user already exist';
      throw errors;
    }
    const hash = await bcrypt.hash(password, 12);
    const response = await User.create({
      userName,
      password: hash,
      email,
      createAt: new Date().toISOString(),
    });

    const token = generateToken(response);
    const userData = { id: response._id, userName: response.userName, token };

    res.status(200).json({ success: true, userData });
  } catch (errors) {
    res.status(400).json({ success: false, errors });
  }
}
