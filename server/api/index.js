const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get("/", (req, res) => {
    res.send('You have reached the api route!')
})

router.get("/posts", async (req, res) => {
    const posts = await prisma.posts.findMany();

    res.send(posts);
});

router.get("/posts/:id", async (req, res) => {
    try{
        const post = await prisma.posts.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        res.send(post);            
    } catch(error){
        res.send({error: true, message: "Something went wrong!"})
    }

});

module.exports = router;