import mongoose, { Model, Types } from 'mongoose';

interface ProductSchema {
  _id: Types.ObjectId;
  createAt: number;
  desired_price: number;
  last_price: number;
  productURL: string;
  product_name: string;
  shop_name: string;
  isPriceMeet: boolean;
  siteUrl: string;
  updated: number;
}

interface UserScheme {
  userName: string;
  password: string;
  email: string;
  createAt: string;
  trackers: Types.DocumentArray<ProductSchema>;
}

const UserSchema = new mongoose.Schema<UserScheme, Model<UserScheme>>({
  userName: String,
  password: String,
  email: String,
  createAt: String,
  trackers: [
    {
      isPriceMeet: Boolean,
      siteUrl: String,
      product_name: String,
      shop_name: String,
      productURL: String,
      desired_price: Number,
      last_price: Number,
      updated: Number,
      createAt: Number,
    },
  ],
});

export default mongoose.models.User ||
  mongoose.model<UserScheme, Model<UserScheme>>('User', UserSchema);
