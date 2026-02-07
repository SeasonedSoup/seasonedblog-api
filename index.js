const express = require("express");
const { prisma } = require("./lib/prisma");
const cors = require('cors');
//Passports for logging in
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

//routers
const userRouter = require("./routes/userRoute");

require("dotenv").config();

const PORT = process.env.PORT
const app = express();



passport.use(
    new LocalStrategy(async (name, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    name: name
                }
            })

            if (!user) {
                return done(null, false, {message: "Incorrect username"});
            }

            const match = await bcrypt.compare(password, user.password) 
            if (!match) {
                return done(null, false, {message: 'Incorrect password'});
            };

            return done(null, user);

        } catch(err) {
            return done(err);
        }
    }));



//parses incoming http to readable javascript object for req.body middleware
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());

app.use("/api", userRouter)

app.get("/", (req, res) => {
    res.send("HI IM AN API");
})

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }

    console.log(`The server is now listening at port ${PORT}`)
})

