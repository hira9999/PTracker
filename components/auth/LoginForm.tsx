import Link from 'next/link';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth/authContext';
import styles from './Login.module.css';
import { useForm } from '../../hooks/useForm';
import Router from 'next/router';

const LoginForm = () => {
  const initialValue = { userName: '', password: '' };

  const {
    loginUser,
    authReset,
    state: { loading, errResponse, token },
  } = useContext(AuthContext);

  const { values, onChange, onSubmit } = useForm<typeof initialValue>(
    loginUser,
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
          <h1>Welcome Back</h1>
        </div>
        <p>Login here using your username and password</p>
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
            name="password"
            onChange={onChange}
            value={values.password}
            type="password"
            className={styles.input}
            placeholder="Your Passsword"
          />
          <button className={styles.button_submit} type="submit">
            {loading ? 'Loading...' : 'Log in'}
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
          <Link href={'/register'}>
            <p>Don&apos;t have an account? Sign Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
