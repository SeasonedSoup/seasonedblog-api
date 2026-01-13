const { prisma } = require("../lib/prisma")

async function postBlogPost(req, res) {
    await prisma.post.create({
        data: {
            id: req.body.id,
            title: req.body.title,
            content: req.body.content
           // authorId: req.params.userId TBI*
        }
    })
}

module.exports = {
    postBlogPost
};