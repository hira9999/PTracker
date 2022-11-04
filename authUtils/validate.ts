import { AuthError } from '../types/interfaces';

export const loginValidator = (userName: string, password: string) => {
  const errors: AuthError = {};
  if (userName.trim() === '') {
    errors.userName = 'Username must not be empty';
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const registerValidator = (
  userName: string,
  password: string,
  confirmPassword: string,
  email: string
) => {
  const errors: AuthError = {};
  if (userName.trim() === '') {
    errors.userName = 'Username must not be empty';
  }
  if (password.trim() === '') {
    errors.password = 'Password must not be empty';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }
  if (email.trim() === '') {
    errors.email = 'Email must not be empty';
  }
  return {
    errors,
    //if no errors return empty
    valid: Object.keys(errors).length < 1,
  };
};
