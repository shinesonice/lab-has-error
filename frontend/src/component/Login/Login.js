import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AuthAction } from "../../store/auth";
import classes from "./Login.module.css";

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please Enter In The Input");
      return;
    }

    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: JSON.stringify({
        password,
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((result) => {
        console.log(result);
        dispatch(AuthAction.login({ name: result.name, email: result.email }));
        navigate("/");
      });
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes["wrap-input"]}>
          <label>YOUR E-MAIL</label>
          <input
            className={classes.input}
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={classes["wrap-input"]}>
          <label>PASSWORD</label>
          <input
            className={classes.input}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className={classes.btn}>Login</button>
      </form>
    </div>
  );
};

export default Login;
