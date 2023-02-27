import { Fragment } from "react";
import SignUp from "../../component/SignUp/SignUp";
import Header from "../../layout/header";

const SignUpPage = (props) => {
  return (
    <Fragment>
      <Header />
      <SignUp />
    </Fragment>
  );
};

export default SignUpPage;
