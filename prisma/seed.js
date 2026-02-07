const {prisma} = require("../lib/prisma");
require("dotenv").config({path: "../.env"});
const bcryptjs = require("bcryptjs");
async function main() {
    const hashedPassword = await bcryptjs.hash(process.env.AUTHOR_PASSWORD, 11)
    
    await prisma.user.create({
        data: {
            username: "Jared",
            email: "test@gmail.com",
            password: hashedPassword,
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