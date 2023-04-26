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
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          axios.get('https://vm-service.tib.co.id/api/v1/getUser').then((response) => {
            const user = response.data.data;

            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user
              }
            });
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

  const login = async (email, password) => {
    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    const response = await axios.post('https://vm-service.tib.co.id/api/loginUser', formData);
    const accessToken = response.data.token;

    setSession(accessToken);

    if (accessToken && isValidToken(accessToken)) {
      axios.get('https://vm-service.tib.co.id/api/v1/getUser').then((response) => {
        const user = response.data.data;

        dispatch({
          type: 'LOGIN',
          payload: {
            user
          }
        });
      });
    }
  };

  const logout = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    axios
      .get('https://vm-service.tib.co.id/api/logout')
      .then(setSession(null))
      .then(dispatch({ type: 'LOGOUT' }));
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
