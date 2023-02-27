const router = require("express").Router();
const AuthController = require("../controllers/auth");

router.post("/login", AuthController.postLogin);
router.post("/signup", AuthController.postSignUp);

module.exports = router;
