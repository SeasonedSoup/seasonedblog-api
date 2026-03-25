const { prisma } = require("../lib/prisma")

async function createPost(req, res) {
    console.log("CREATING");
    //First verify if role is author
    if (req.user.role != "AUTHOR" ) {
        return res.status(403).json({ message: "Forbidden: Creating Post is of role Authors only" });
    }

    try {
        await prisma.post.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                authorId: parseInt(req.user.userId)
            }
        })
        return res.json({message: "Post successfully created"})
    } catch (err) {
        console.error("PRISMA ERROR:", err.message);
        return res.status(500).send()
    }
}

async function deletePost(req, res) {
    await prisma.post.delete({
        where: {
            id: parseInt(req.body.id)
        }
    })

    return res.json("Deleted successfully")
}

async function fetchPosts(req, res) {
    const posts = await prisma.post.findMany()

    return res.json(posts)
}

async function fetchAuthorPosts(req, res) {
     const posts = await prisma.post.findMany({
        where: {
            authorId: parseInt(req.query.id)
        }
     })

    return res.json(posts)
}

async function fetchPublishedPosts(req, res) {
    const posts = await prisma.post.findMany({
        where: {
            published: true
        },
    })

    return res.json(posts)
}

async function findPost(req, res) {
    const post = await prisma.post.findUnique({
        where: {
            id: req.params.id
        }
    })

    return res.json(post);
}


async function updatePost(req, res) {
    const newPost = await prisma.post.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: {
            title: req.body.title,
            content: req.body.content
        }
    });

    return res.json(newPost)
}

async function togglePostStatus(req, res) {
    const newStatus = JSON.parse(req.body.published)
    const newPost = await prisma.post.update({
        where: {
            id: parseInt(req.body.id)
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
    fetchAuthorPosts,
    fetchPublishedPosts,
    findPost,
    deletePost,
    updatePost,
    togglePostStatus
};