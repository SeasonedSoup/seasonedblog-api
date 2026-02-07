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

async function loginUser(req, res) {
    jwt.sign({userId: req.user.id},
        process.env.JWTSECRET,
        {expiresIn: '7d'}, (err, token) => {
            if (err) {
                return res.send("Error in processing the token has occured")
            }
            res.json({token})
        }
    )
}




module.exports = {
    createUser,
    loginUser
}