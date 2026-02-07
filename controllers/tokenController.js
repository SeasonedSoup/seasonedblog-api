async function giverUserToken(req, res) {
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

async function verifyUserToken (req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader == null) return res.sendStatus(403);

    const bearer = bearerHeader.split("");
    const token = bearer[1];

    req.token = token; 
    next();
}

