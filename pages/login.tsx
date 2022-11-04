import React from 'react';
import Head from 'next/head';
import LoginForm from '../components/auth/LoginForm';

function Login() {
  return (
    <>
      <Head>
        <title>Login to pTracker</title>
      </Head>
      <LoginForm />
    </>
  );
}

export default Login;
