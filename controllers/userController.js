const { prisma } = require("../lib/prisma.js")
const bcryptjs = require("bcryptjs")

async function createUser(req, res) {
    const hashedPass = await bcryptjs.hash(req.body.password ,11) 
    await prisma.user.create({
        data: {
            id: req.body.id,
            password: hashedPass,
            email: req.body.email,
            name: req.body.name
        }
    })
}

module.exports = {
    createUser
}