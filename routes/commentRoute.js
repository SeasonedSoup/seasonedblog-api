const {Router} = require("express")
const commentController  = require("../controllers/commentController");
const tokenController = require("../controllers/tokenController");

const commentRouter = Router();

commentRouter.get("/comments/:postId", commentController.getComments)
commentRouter.post("/comment", tokenController.verifyUserToken, commentController.createComment)

module.exports = commentRouter;