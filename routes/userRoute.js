const { Router } = require("express");
const userController  = require("../controllers/userController");
const tokenController = require("../controllers/tokenController")
const passport = require("passport");

const userRouter = Router();

userRouter.get('/', tokenController.verifyUserToken, userController.getUser )
userRouter.post('/login', passport.authenticate('local', {session: false}), tokenController.giveUserToken)
userRouter.post('/signup', userController.createUser);

module.exports = userRouter;