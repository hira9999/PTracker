import { AuthReducerAction, InitialAuthState } from '../../types/context';

const AuthReducer = (
  state: InitialAuthState,
  action: AuthReducerAction
): InitialAuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        loading: true,
      };
    case 'SET_TOKEN':
      return { ...state, token: action.payload };

    case 'AUTH_SUCCESS':
      return { ...state, loading: false, data: action.payload };

    case 'AUTH_FAILURE':
      return {
        ...state,
        loading: false,
        error: true,
        errResponse: action.payload,
      };

    case 'AUTH_RESET':
      return {
        ...state,
        loading: false,
        error: false,
        errResponse: '',
        data: null,
        token: '',
      };
  }
};

export default AuthReducer;
