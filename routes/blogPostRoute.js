const { Router } = require("express")
const blogPostController = require("../controllers/blogPostController");


const blogPostRouter = Router();

blogPostRouter.get("/posts", blogPostController.fetchPosts);
blogPostRouter.post("/posts", blogPostController.createPost);

module.exports = blogPostRouter;