import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
// utils
import { setSession, isValidToken } from "../utils/jwt";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getMyDoctor } from "../redux/slices/user";
import { useDispatch } from "../redux/store";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: true,
  user: null,
  error: null,
};
const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    // console.log('state here :', state);
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  RESET: (state, action) => {
    const { error } = action.payload;

    return {
      ...state,
      error,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: "jwt",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const dispatchRoot = useDispatch();

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");

        if (accessToken && isValidToken(accessToken)) {
          const response = await axios.get("/api/v1/account/my-account", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const { user } = response.data?.data;

          setSession(accessToken);
          dispatchRoot(getMyDoctor());
          dispatchRoot(getCurrentUser());

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post("/api/auth/login", {
      email,
      password,
    });

    const { accessToken, user } = response.data.data;

    setSession(accessToken);
    await dispatchRoot(getCurrentUser());

    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };
  const register = async (values) => {
    const { email, password, firstName, lastName } = values;
    const response = await axios.post("/api/auth/register", {
      email,
      password,
      firstName,
      lastName,
      role: "patient",
    });
    const { token, user } = response.data.data;
    setSession(token);

    dispatch({
      type: "REGISTER",
      payload: {
        user,
      },
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };
  const resetPassword = async (oldPassword, newPassword) => {
    try {
      const accessToken = window.localStorage.getItem("accessToken");

      await axios.post("/api/v1/users/reset", {
        headers: { Authorization: `Bearer ${accessToken}` },
        oldPassword,
        newPassword,
      });
      dispatch({
        type: "RESET",
        payload: {
          error: null,
        },
      });
    } catch (error) {
      dispatch({
        type: "RESET",
        payload: {
          error: "Old password is incorrect.",
        },
      });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "jwt",
        login,
        logout,
        register,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
