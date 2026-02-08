const jwt = require("jsonwebtoken");
require("dotenv").config();

async function giveUserToken(req, res) {
    jwt.sign({userId: req.user.id, role: req.user.role},
        process.env.JWTSECRET,
        {expiresIn: '7d'}, (err, token) => {
            if (err) {
                return res.send("Error in processing the token has occured")
            }
            res.json({token})
        }
    )
}

async function verifyUserToken (req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader == null) return res.sendStatus(403);

    const bearer = bearerHeader.split("");
    const token = bearer[1];

    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET)

        req.user = decoded
        next();
    } catch (err) {
        res.status("403", {message: "Invalid or Expired Token"});
    }
}

module.exports = {
    giveUserToken,
    verifyUserToken
}
