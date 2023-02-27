const Post = require("../models/post");

module.exports.postAddPost = (req, res, next) => {
  const file = req.file;
  const title = req.body.title;
  const content = req.body.content;

  Post.create({ title, content, imageUrl: file.path, createdAt: Date.now() })
    .then((result) => {
      const io = require("../socket").getIo();
      io.emit("new post", result);
      res.send({ result: true });
    })
    .catch((err) => console.log(err));
};

module.exports.postUpdatePost = (req, res, next) => {
  const file = req.file;
  const title = req.body.title;
  const content = req.body.content;
  const postId = req.body.postId;

  console.log("in update");

  Post.findByIdAndUpdate(postId)
    .then((result) => {
      result.title = title;
      result.content = content;
      result.imageUrl = file.path;
      return result.save();
    })
    .then((result) => {
      res.send({ result: true });
    })
    .catch((err) => console.log(err));
};

module.exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.send(posts);
    })
    .catch((err) => console.log(err));
};

module.exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((posts) => {
      res.send(posts);
    })
    .catch((err) => console.log(err));
};

module.exports.deletePost = (req, res, next) => {
  const postId = req.body.postId;
  console.log(postId);
  Post.findByIdAndDelete(postId, (err, docs) => {
    if (err) console.log(err);
    else console.log("deleted");
    res.send({ result: true });
  });
};
