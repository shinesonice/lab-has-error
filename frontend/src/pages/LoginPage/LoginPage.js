import { Fragment } from "react";
import Login from "../../component/Login/Login";
import Header from "../../layout/header";

const LoginPage = (props) => {
  return (
    <Fragment>
      <Header />
      <Login />
    </Fragment>
  );
};

export default LoginPage;
