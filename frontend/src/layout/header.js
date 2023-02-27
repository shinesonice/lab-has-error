import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import classes from "./header.module.css";

const Header = (props) => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const email = useSelector((state) => state.auth.email);
  return (
    <div className={classes.container}>
      <div className={classes["wrap-logo"]}>
        <h3 className={classes.logo}>MessageNode</h3>
      </div>
      {!isLogin && (
        <div className={classes["nav-bar"]}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.link
            }
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.link
            }
            to="/signup"
          >
            SignUp
          </NavLink>
        </div>
      )}
      {isLogin && <p>{email}</p>}
    </div>
  );
};

export default Header;
