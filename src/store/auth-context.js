import React from 'react';

const AuthContext = React.createContext({
    token: null,
    isLoggedIn: false,
    onLogin: (token) => {},
    onLogout: () => {}
});

export default AuthContext;