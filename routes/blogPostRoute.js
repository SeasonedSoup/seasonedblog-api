const { Router } = require("express")
const blogPostController = require("../controllers/blogPostController");
const tokenController = require("../controllers/tokenController");


const blogPostRouter = Router();

blogPostRouter.get("/posts", blogPostController.fetchPosts);
blogPostRouter.post("/post", tokenController.verifyUserToken, blogPostController.createPost);
blogPostRouter.patch("/togglepub", blogPostController.togglePostStatus);
blogPostRouter.put("/:id/edit", blogPostController.updatePost);

module.exports = blogPostRouter;