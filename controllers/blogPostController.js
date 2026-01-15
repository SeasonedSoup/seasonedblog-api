const { prisma } = require("../lib/prisma")

async function createPost(req, res) {
    await prisma.post.create({
        data: {
            id: req.params.id,
            title: req.body.title,
            content: req.body.content
           // authorId: req.params.userId TBI*
        }
    })
}

async function deletePost(req, res) {
    await prisma.post.delete({
        where: {
            id: req.params.id
        }
    })
}

async function fetchPosts(req, res) {
    const posts = await prisma.post.findMany()

    return posts
}


async function updatePost(req, res) {
    const newPost = await prisma.post.update({
        where: {
            id: req.params.id
        },
        data: {
            title: req.body.title,
            content: req.body.content
        }
    });

    console.log(newPost);
}

module.exports = {
    createPost,
    fetchPosts,
    deletePost,
    updatePost
    
};