import { useNavigate } from "react-router";
import classes from "./MessageItem.module.css";

const MessageItem = (props) => {
  const navigate = useNavigate();

  const viewHandler = () => {
    navigate(`/detail/${props.data._id}`);
  };

  const editHandler = () => {
    navigate(`/edit/${props.data._id}`);
  };
  const deleteHandler = () => {
    fetch("http://localhost:5000/delete-post", {
      method: "POST",
      body: JSON.stringify({ postId: props.data._id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      navigate("/", { replace: true });
      window.location.reload();
    });
  };

  return (
    <div className={classes.container}>
      <p className={classes.time}>
        Posted by on{" "}
        {new Date(props.data.createdAt).toLocaleDateString("pt-PT")}
      </p>
      <p className={classes.title}>{props.data.title}</p>
      <div className={classes["gr--btn"]}>
        <button className={classes.btn} onClick={viewHandler}>
          View
        </button>
        <button className={classes.btn} onClick={editHandler}>
          Edit
        </button>
        <button className={classes.btn} onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MessageItem;
