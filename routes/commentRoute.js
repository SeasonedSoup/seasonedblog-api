const {Router} = require("express")
const commentController  = require("../controllers/commentController");
const tokenController = require("../controllers/tokenController");

const commentRouter = Router();

commentRouter.get("/comments/:postId", commentController.getComments)
commentRouter.post("/comment/:postId", tokenController.verifyUserToken, commentController.createComment)
commentRouter.delete("/delete/:commentId", tokenController.verifyUserToken, commentController.deleteComment)
module.exports = commentRouter;