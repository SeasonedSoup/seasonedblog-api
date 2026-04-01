const {prisma} = require("../lib/prisma");
require("dotenv").config({path: "../.env"});
const bcryptjs = require("bcryptjs");
async function main() {
    const hashedPassword = await bcryptjs.hash(process.env.AUTHOR_PASSWORD, 11)
    const user = await prisma.user.create({
        data: {
        username: "Jared",
        email: "test@gmail.com",
        password: hashedPassword,
        role: "AUTHOR",
        },
    });

    // Create a post linked to the user
    const post = await prisma.post.create({
        data: {
        title: "My First Post",
        content: "This is a seeded post.",
        published: true,
        authorId: user.id,
        },
    });

    // Create a comment linked to both user and post
    await prisma.comment.create({
        data: {
        text: "Nice post!",
        commenterId: user.id,
        postId: post.id,
        },
    });

    console.log("Seeding completed successfully.");
    }

main()
    .then(async () => { await prisma.$disconnect() })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });