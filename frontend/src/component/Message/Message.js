import { useEffect, useState } from "react";
import FormPost from "./FormPost";
import classes from "./Message.module.css";
import MessageItem from "./MessageItem";
import { io } from "socket.io-client";

const Message = () => {
  const [posts, setPosts] = useState([]);
  const [isShowFormPost, setIsShowFormPost] = useState(false);

  useEffect(() => {
    const server = io("http://localhost:5000");
    server.on("new post", (post) => {
      console.log(post);
    });
    fetch("http://localhost:5000/posts", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const hideFormHandler = () => {
    setIsShowFormPost(false);
  };
  const showFormHandler = () => {
    setIsShowFormPost(true);
  };
  return (
    <div className={classes.container}>
      {isShowFormPost && (
        <div className={classes["pop-up"]}>
          <FormPost onHidePost={hideFormHandler} />
        </div>
      )}

      <div className={classes["wrap"]}>
        <input className={classes.input} placeholder="I am now!" />
        <label>Update</label>
      </div>
      <button className={classes.btn} onClick={showFormHandler}>
        NEW POST
      </button>
      {posts.length === 0 && <p>No posts found.</p>}
      <div className={classes["wrap-posts"]}>
        {posts.map((post) => {
          return <MessageItem data={post} />;
        })}
      </div>
    </div>
  );
};

export default Message;
