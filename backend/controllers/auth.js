const User = require("../models/user");

module.exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email, password }).then((user) => {
    if (!user) {
      res.statusCode = 400;
      res.send({ result: false, message: "no bro" });
      return;
    }

    req.session.isLogin = true;
    req.session.user = user;

    return req.session.save((err) => {
      console.log(err);
      console.log("req session in loginpost", req.session);

      res.send({ result: true, name: user.name, email: user.email });
    });
  });
};

module.exports.postSignUp = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  User.create({
    name,
    email,
    password,
  })
    .then((result) => res.send({ result: true }))
    .catch((err) => console.log(err));
};
