import { Fragment } from "react";
import Message from "../../component/Message/Message";
import Header from "../../layout/header";

const MainPage = (props) => {
  return (
    <Fragment>
      <Header />
      <Message />
    </Fragment>
  );
};

export default MainPage;
