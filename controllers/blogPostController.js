const { prisma } = require("../lib/prisma")

async function createPost(req, res) {
    await prisma.post.create({
        data: {
            id: req.body.id,
            title: req.body.title,
            content: req.body.content
           // authorId: req.params.userId TBI*
        }
    })
}

async function fetchPosts(req, res) {
    const posts = await prisma.post.findMany()

    return posts
}

module.exports = {
    createPost,
    fetchPosts,
    
};