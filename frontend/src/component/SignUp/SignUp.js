import { useState } from "react";
import { useNavigate } from "react-router";
import classes from "./SignUp.module.css";

const SignUp = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      alert("Please Enter In The Input");
      return;
    }

    fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        password,
        email,
        name,
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
        navigate("/login");
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
          <label>YOUR NAME</label>
          <input
            className={classes.input}
            type="text"
            onChange={(e) => {
              setName(e.target.value);
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
        <button className={classes.btn}>SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
