import { AuthContextInterface, TrackersContextInterface } from './context';

interface UserInputValue {
  userName: string;
  password: string;
  confirmPassword?: string;
  email?: string;
}

interface UserData {
  id: string;
  token: string;
  userName: string;
}

interface Product {
  createAt: number;
  desired_price: number;
  last_price: string;
  productURL: string;
  product_name: string;
  shop_name: string;
  siteUrl: string;
  updated: number;
  _id: string;
}

interface DecodedJwt {
  id: string;
  email: string;
  userName: string;
  iat: number;
  exp: number;
}

interface AuthError {
  userName?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
  userInputError?: string;
  general?: string;
}

type SumbitCallbacks<T> =
  | AuthContextInterface<T>['loginUser']
  | AuthContextInterface<T>['registerUser']
  | TrackersContextInterface<T>['createItem'];

export type {
  UserData,
  Product,
  DecodedJwt,
  UserInputValue,
  AuthError,
  SumbitCallbacks,
};
