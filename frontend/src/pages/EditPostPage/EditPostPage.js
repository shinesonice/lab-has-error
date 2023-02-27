import { Fragment } from "react";
// import DetailPost from "../../component/DetailPost/DetailPost";
import FormEditPost from "../../component/FormEditPost/FormEditPost";
// import Login from "../../component/Login/Login";
import Header from "../../layout/header";

const EditPostPage = (props) => {
  return (
    <Fragment>
      <Header />
      <FormEditPost />
    </Fragment>
  );
};

export default EditPostPage;
