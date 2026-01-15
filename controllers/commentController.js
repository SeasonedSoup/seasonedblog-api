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

module.exports = {
    createComment,
    deleteComment
}