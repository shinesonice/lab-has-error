import { useEffect, useState } from "react";
import { useLocation, useMatch, useMatches, useParams } from "react-router";
import classes from "./DetailPost.module.css";

const DetailPost = () => {
  const [post, setPost] = useState(null);
  const params = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/post/${params.postId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      });
  }, []);

  if (!post) return <div />;
  else
    return (
      <div className={classes.container}>
        <div className={classes["wrap-title"]}>
          <h3 className={classes.title}>{post.title}</h3>
          <p className={classes.time}>
            Posted by on {new Date(post.createdAt).toLocaleDateString("pt-PT")}
          </p>
        </div>
        <img
          className={classes.img}
          src={`http://localhost:5000/${post.imageUrl}`}
        />
        <div className={classes["wrap-content"]}>
          <p className={classes.content}>{post.content}</p>
        </div>
      </div>
    );
};

export default DetailPost;
