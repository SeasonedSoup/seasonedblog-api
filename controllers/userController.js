const { prisma } = require("../lib/prisma.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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



module.exports = {
    createUser,
    loginUser
}