const { prisma } = require("../lib/prisma.js");
const bcryptjs = require("bcryptjs");

async function createUser(req, res) {
    const hashedPass = await bcryptjs.hash(req.body.password ,11) 
    const result = await prisma.user.create({
        data: {
            password: hashedPass,
            email: req.body.email,
            username: req.body.username
        }
    });
    console.log(result);
    res.json({message: "Signed up successfully!"}); 
};

async function getUser(req, res) {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id 
        }
    })

    res.json(user)
}
    
module.exports = {
    createUser,
    getUser
}