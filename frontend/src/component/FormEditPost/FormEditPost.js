import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import classes from "./FormEditPost.module.css";

const FormEditPost = (props) => {
  const params = useParams();

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!params.postId) {
      navigate("/");
      return;
    }
    fetch(`http://localhost:5000/post/${params.postId}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      })
      .catch((err) => console.log(err));
  }, []);

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
    formData.append("postId", params.postId);

    fetch("http://localhost:5000/update-post", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className={classes["wrap-container"]}>
      <div className={classes.container}>
        <div className={classes["wrap-title"]}>
          <h3 className={classes.title}>New Post</h3>
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <label>TITLE</label>
          <input onChange={(e) => setTitle(e.target.value)} value={title} />
          <label>IMAGE</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <p>please choose an image</p>
          <label>CONTENT</label>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <div className={classes["gr--btn"]}>
            <button
              className={classes.btn}
              type="button"
              onClick={() => {
                navigate("/");
              }}
            >
              CANCLE
            </button>
            <button className={classes.btn}>ACCEPT</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormEditPost;
