const { Router } = require("express")
const blogPostController = require("../controllers/blogPostController");
const tokenController = require("../controllers/tokenController");


const blogPostRouter = Router();

blogPostRouter.get("/post", blogPostController.fetchPosts);
blogPostRouter.post("/post", tokenController.verifyUserToken, blogPostController.createPost);
blogPostRouter.put("/:id/edit", blogPostController.updatePost);

module.exports = blogPostRouter;