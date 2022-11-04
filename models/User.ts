import mongoose, { Model, Types } from 'mongoose';

interface ProductSchema {
  _id: Types.ObjectId;
  createAt: number;
  desired_price: number;
  last_price: string;
  productURL: string;
  product_name: string;
  shop_name: string;
  siteUrl: string;
  updated: number;
}

interface IUser {
  userName: string;
  password: string;
  email: string;
  createAt: string;
  trackers: Types.DocumentArray<ProductSchema>;
}

const UserSchema = new mongoose.Schema<IUser, Model<IUser>>({
  userName: String,
  password: String,
  email: String,
  createAt: String,
  trackers: [
    {
      siteUrl: String,
      product_name: String,
      shop_name: String,
      productURL: String,
      desired_price: Number,
      last_price: String,
      updated: Number,
      createAt: Number,
    },
  ],
});

export default mongoose.models.User ||
  mongoose.model<IUser, Model<IUser>>('User', UserSchema);
