import { useRef, useContext } from "react";
import { useHistory } from 'react-router-dom';

import AuthContext from "../../store/auth-context";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();
  const passwordRef = useRef();
  const { token } = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAHn1Xl9MR7p0vKpUQ-g_y8T6noz_cvmfQ",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken: token,
          password: passwordRef.current.value,
          returnSecureToken: false,
        }),
      }
    ).then((res) => {
      history.replace('/');
    })
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" minLength="6" ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
