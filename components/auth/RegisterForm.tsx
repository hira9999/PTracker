import Link from 'next/link';
import Router from 'next/router';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/authContext';
import styles from './Login.module.css';
import { useForm } from '../../hooks/useForm';

const RegisterForm = () => {
  const initialValue = {
    userName: '',
    password: '',
    email: '',
    confirmPassword: '',
  };
  const {
    authReset,
    registerUser,
    state: { loading, errResponse, token },
  } = useContext(AuthContext);

  const { values, onChange, onSubmit } = useForm<typeof initialValue>(
    registerUser,
    initialValue
  );

  useEffect(() => {
    if (token) {
      Router.push('/dashboard');
    }
  }, [token]);

  return (
    <div className={styles.container}>
      <div className={styles.form_wrap}>
        <div className={styles.banner}>
          <h1>Welcome To PTracker</h1>
        </div>
        <p>Register here to start tracking prices like an OG</p>
        <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
          <input
            name="userName"
            onChange={onChange}
            value={values.userName}
            type="text"
            className={styles.input}
            placeholder="Your ID"
          />
          <input
            name="email"
            onChange={onChange}
            value={values.email}
            type="email"
            className={styles.input}
            placeholder="Your Email"
          />
          <input
            name="password"
            onChange={onChange}
            value={values.password}
            type="password"
            className={styles.input}
            placeholder="Your Passsword"
          />
          <input
            name="confirmPassword"
            onChange={onChange}
            value={values.confirmPassword}
            type="password"
            className={styles.input}
            placeholder="Your Confirm Password"
          />
          <button className={styles.button_submit} type="submit">
            {loading ? 'Loading...' : 'Register'}
          </button>
        </form>
        {errResponse && (
          <div className={styles.error}>
            <ul>
              {Object.values(errResponse).map((error: string, i) => (
                <li key={i}>#{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.link} onClick={() => authReset()}>
          <Link href={'/login'}>
            <p>Already have an account? Sign in</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
