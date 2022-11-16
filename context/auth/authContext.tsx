import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from 'react';
import { authAPI } from '../../utils/apiUtil';
import AuthReducer from './authReducer';
import jwtDecode from 'jwt-decode';
import { DecodedJwt } from '../../types/interfaces';
import { AuthContextInterface } from '../../types/context';

const initialAuthState = {
  loading: true,
  data: null,
  error: false,
  errResponse: null,
  token: '',
};

export const AuthContext = createContext<AuthContextInterface<unknown> | null>(
  null
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState);

  const decodeJwt = useCallback(() => {
    dispatch({
      type: 'AUTH_START',
    });
    const token = localStorage.getItem('jwtToken');
    dispatch({
      type: 'SET_TOKEN',
      payload: token,
    });

    if (token) {
      const decodedJwt: DecodedJwt = jwtDecode(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken');
        dispatch({
          type: 'AUTH_FAILURE',
          payload: { token: 'Expired token' },
        });
      } else {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: decodedJwt,
        });
      }
    }
  }, []);

  useEffect(() => {
    decodeJwt();
  }, [decodeJwt]);

  const loginUser = async <T,>(userData: T) => {
    try {
      dispatch({
        type: 'AUTH_START',
      });
      const res = await authAPI.post('/login', userData);
      const token = res.data.userData.token;
      localStorage.setItem('jwtToken', token);
      decodeJwt();
    } catch (err) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: err.response.data.errors,
      });
    }
  };

  const registerUser = async <T,>(userData: T) => {
    try {
      dispatch({
        type: 'AUTH_START',
      });

      const res = await authAPI.post('/register', userData);
      const token = res.data.userData.token;
      localStorage.setItem('jwtToken', token);

      decodeJwt();
    } catch (err) {
      dispatch({ type: 'AUTH_FAILURE', payload: err.response.data.errors });
    }
  };

  const authReset = () => {
    localStorage.removeItem('jwtToken');
    dispatch({
      type: 'AUTH_RESET',
    });
  };

  return (
    <AuthContext.Provider value={{ state, loginUser, registerUser, authReset }}>
      {children}
    </AuthContext.Provider>
  );
};
