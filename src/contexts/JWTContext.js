import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from 'axios';

import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  })
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      const user = JSON.parse(window.localStorage.getItem('userData'));
      try {
        if (user && isValidToken(user.access_token)) {
          setSession(user.access_token);
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (username, password) => {
    const formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);

    const response = await axios.post('https://vm-service.tib.co.id/api/auth/login', formData);
    const accessToken = response.data.access_token;
    const user = response.data;

    window.localStorage.setItem('userData', JSON.stringify(response.data));

    if (accessToken && isValidToken(accessToken)) {
      dispatch({
        type: 'LOGIN',
        payload: {
          user
        }
      });
    }
  };

  const logout = async () => {
    setSession(null);
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
