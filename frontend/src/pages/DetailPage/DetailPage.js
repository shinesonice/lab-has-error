import { Fragment } from "react";
import DetailPost from "../../component/DetailPost/DetailPost";
// import Login from "../../component/Login/Login";
import Header from "../../layout/header";

const DetailPage = (props) => {
  return (
    <Fragment>
      <Header />
      <DetailPost />
    </Fragment>
  );
};

export default DetailPage;
