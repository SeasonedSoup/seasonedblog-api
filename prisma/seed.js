const {prisma} = require("../lib/prisma");
require("dotenv").config({path: "../.env"});

async function main() {
    await prisma.user.create({
        data: {
            username: "Jared",
            email: "test@gmail.com",
            password: process.env.AUTHOR_PASSWORD,
            role: "AUTHOR",
        }
    })
}

main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });