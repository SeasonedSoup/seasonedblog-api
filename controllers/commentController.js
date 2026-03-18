const {prisma} = require("../lib/prisma.js");

async function createComment(req, res) {
    
    if (req.user.role != "AUTHOR" || req.user.role != "USER") {
        return res.status(403).json({ message: "Forbidden: You must be logged in to comment" });
    }

    await prisma.comment.create({
        data: {
            id: req.body.id,
            text: req.body.text,
            postId: req.params.postId,
            commenterId: req.user.id
        }
    })
}

async function deleteComment(req, res) {
    await prisma.comment.delete({
        where: {
            id: req.params.id 
        }
    })
}
//tbc we will get usernames as well along with comments for seeing on posts
async function getComments(req, res) {
    const comments = await prisma.comment.findMany({
        where: { //prototype
            postId: req.params.postId,
        }
    })

    res.json(comments)
}

module.exports = {
    createComment,
    deleteComment,
    getComments
}