import { useState } from "react";
import { useNavigate } from "react-router";
import classes from "./FormPost.module.css";

const FormPost = (props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !file || !content) {
      alert("please fill all input");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("content", content);

    fetch("http://localhost:5000/create-post", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        props.onHidePost();
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className={classes.container}>
      <div className={classes["wrap-title"]}>
        <h3 className={classes.title}>New Post</h3>
      </div>
      <form className={classes.form} onSubmit={submitHandler}>
        <label>TITLE</label>
        <input onChange={(e) => setTitle(e.target.value)} />
        <label>IMAGE</label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <p>please choose an image</p>
        <label>CONTENT</label>
        <textarea onChange={(e) => setContent(e.target.value)} />
        <div className={classes["gr--btn"]}>
          <button
            className={classes.btn}
            type="button"
            onClick={props.onHidePost}
          >
            CANCLE
          </button>
          <button className={classes.btn}>ACCEPT</button>
        </div>
      </form>
    </div>
  );
};

export default FormPost;
