const { prisma } = require("../lib/prisma.js")

async function createUser(req, res) {
    await prisma.user.create({
        data: {
            password: req.body.password,
            email: req.body.email,
            name: req.body.name
        }
    })
}

module.exports = {
    createUser
}