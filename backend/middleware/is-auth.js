module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    console.log("Vi Pham");
    res.send({ message: "No bro" });
    return;
  }
  next();
};
