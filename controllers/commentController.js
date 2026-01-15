const {prisma} = require("../lib/prisma.js");

async function createComment(req, res) {
    await prisma.comment.create({
        data: {
            id: req.body.id,
            text: req.body.text,
            postId: req.params.postId

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
            commenterId: req.params.commenterId
        }
    })

    return comments
}

module.exports = {
    createComment,
    deleteComment,
    getComments
}