const jwt = require("jsonwebtoken");
require("dotenv").config();

async function giveUserToken(req, res) {
    jwt.sign({userId: req.user.id, role: req.user.role},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}, (err, token) => {
            if (err) {
                return res.status(401).json({error: "Error in processing the token has occured"})
            }
            res.json({token})
        }
    )
}

async function verifyUserToken (req, res, next) {
    console.log("VERIFYING")
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader == null) return res.status(403);

    const bearer = bearerHeader.split(" ");
    const token = bearer[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("DECODED SUCCESS:", decoded); 

        req.user = decoded
        next();
    } catch (err) {
        res.status(403).json({message: "Invalid or Expired Token"});
    }
}

module.exports = {
    giveUserToken,
    verifyUserToken
}
