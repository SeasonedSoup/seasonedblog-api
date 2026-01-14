const { prisma } = require("../lib/prisma.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");const { use } = require("react");
;

async function createUser(req, res) {
    const hashedPass = await bcryptjs.hash(req.body.password ,11) 
    await prisma.user.create({
        data: {
            id: req.body.id,
            password: hashedPass,
            email: req.body.email,
            name: req.body.name
        }
    });
};

async function loginUser(req, res) {
    const user = await prisma.user.findUnique({
        where: {
            email: req.body.email
        }
    })

    if (!user) {
        return res.status(404).json({error: "User does not exist"});
    }

    const matchResult = await bcryptjs.compare(req.body.password, user.password);

    if (!matchResult) {
        return res.status(401).json({error: "Wrong username or password"});
    }
    jwt.sign({userId: user.id}, 'secretkey', (err, token) => {
        if (err) {
            return res.status(500).json({ error: 'Token error' });
        }
        
        res.json(token);
    });
}

module.exports = {
    createUser
}