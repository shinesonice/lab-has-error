const express = require("express");
const cors = require("cors");
const AuthRouter = require("./routers/auth");
const PostRouter = require("./routers/post");
const mongoose = require("mongoose");
const multer = require("multer");
const session = require("express-session");
const User = require("./models/user");
const cookieParser = require("cookie-parser");

const MONGODB_URI =
  "mongodb+srv://test1234:test1234@cluster0.uey5rx7.mongodb.net/lab21?retryWrites=true&w=majority";

const MongoDBStore = require("connect-mongodb-session")(session);

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now().toString() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(cookieParser());

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    // store: store,
    cookie: {
      maxAge: 3600000, // thời gian sống của cookie, tính bằng millisecond
      secure: false, // chỉ sử dụng cookie khi HTTPS được bật
    },
  })
);

app.use(express.json());
app.use("/images", express.static("images"));

app.use((req, res, next) => {
  // console.log("cookie", req.cookies, req.cookie);
  console.log("userId", req.session);
  if (!req.session.user) return next();
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use("/auth", AuthRouter);
app.use("/", upload.single("file"), PostRouter);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    const server = app.listen(5000);
    const io = require("./socket").init(server);
    io.on("connection", (server) => {
      // console.log("have a client connect");
    });
    console.log("connection");
  })
  .catch((err) => console.log(err));
