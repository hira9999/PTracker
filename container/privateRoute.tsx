import Router from 'next/router';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/auth/authContext';
import Login from '../pages/login';

const privateRoute = (Component) => {
  const Auth = () => {
    const {
      state: { token },
    } = useContext(AuthContext);

    // If user is not logged in, return login component
    if (!token) {
      return Router.push('/login') && <Login />;
    }
    // If user is logged in, return original component
    return <Component />;
  };

  return Auth;
};

export default privateRoute;
