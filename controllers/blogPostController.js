const { prisma } = require("../lib/prisma")

async function createPost(req, res) {
    //First verify if role is author
    if (req.user.role != "AUTHOR" ) {
        return res.status(403).json({ message: "Forbidden: Creating Post is of role Authors only" });
    }

    await prisma.post.create({
        data: {
            title: req.body.title,
            content: req.body.content,
            authordId: req.user.userId
        }
    })
    return res.json({message: "Post successfully created"})
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

async function togglePostStatus(req, res) {
    const newStatus = !req.body.published
    const newPost = await prisma.post.update({
        where: {
            id: req.params.id
        },
        data : {
            published: newStatus
        }
    });

    console.log(newPost);
}

module.exports = {
    createPost,
    fetchPosts,
    deletePost,
    updatePost,
    togglePostStatus
    
};