import React, { useState, useEffect, useCallback } from "react";
import AuthContext from "./auth-context";

let logoutTimer;

const calculateExpiration = (time) => {
  const current = new Date().getTime();
  const adjustedExr = new Date(time).getTime();

  const remaining = adjustedExr - current;

  return remaining;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpiration = localStorage.getItem("expiresIn");

  const remaining = calculateExpiration(storedExpiration);

  if (remaining <= 3600) {
    localStorage.clear();
    return null;
  }

  return { token: storedToken, expiresIn: storedExpiration };
};

const AuthProvider = (props) => {
  const storedData = retrieveStoredToken();
  let initToken;

  if (storedData) {
    initToken = storedData.token;
  }

  const [token, setToken] = useState(initToken);

  const isLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    localStorage.setItem("token", token);
    localStorage.setItem("expiresIn", expirationTime);
    setToken(token);
    const remaining = calculateExpiration(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remaining);
  };

  useEffect(() => {
    if (storedData) {
      logoutTimer = setTimeout(logoutHandler, storedData.expiresIn);
    }
  }, [storedData, logoutHandler])

  const context = {
    token,
    isLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
