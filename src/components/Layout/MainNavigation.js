import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const { token, onLogout } = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!token && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {token && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {token && (
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
