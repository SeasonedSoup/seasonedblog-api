const { Router } = require("express");
const userController  = require("../controllers/userController");
const passport = require("passport");

const userRouter = Router();

userRouter.post('/login', passport.authenticate('local', {session: false}), userController.loginUser)

module.exports = userRouter;