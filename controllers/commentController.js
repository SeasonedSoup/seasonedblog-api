const {prisma} = require("../lib/prisma.js");

async function createComment(req, res) {
    
    if (req.user.role != "AUTHOR" && req.user.role != "USER") {
        return res.status(403).json({ message: "Forbidden: You must be logged in to comment" });
    }

    const result = await prisma.comment.create({
        data: {
            text: req.body.text,
            postId: Number(req.params.postId),
            commenterId: parseInt(req.user.userId)
        }
    })

    res.json(result)
}

async function deleteComment(req, res) {
    await prisma.comment.delete({
        where: {
            id: parseInt(req.params.commentId) 
        }
    })

    res.json(`DELETE SUCCESSFULLY ID:`, req.params.commentId)
}
//tbc we will get usernames as well along with comments for seeing on posts
async function getComments(req, res) {
    const comments = await prisma.comment.findMany({
        where: { //prototype
            postId: parseInt(req.params.postId),
        }
    })

    res.json(comments)
}

module.exports = {
    createComment,
    deleteComment,
    getComments
}