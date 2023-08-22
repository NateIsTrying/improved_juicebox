const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.use(require("body-parser").json());

router.get("/", (req, res) => {
    res.send("You have reached the auth router!")
})
// Register the user
router.post("/register", async(req, res) => {
    try {
        const user = req.body;
        console.log(user);
        user.password = await bcrypt.hash(user.password, 10);

        const result = await prisma.users.create({
            data: user
        });

        if(result){
            const token = jwt.sign({ id: result.id }, process.env.JWT);
            
            res.status(201).send(token);
        } else {
            res.send({message: "Could not add User"})
        }
    } catch (error) {
        res.send(error.message);
    }
    
});

// Sign In as user
router.post('/login', async(req, res) => {
    const {username, password} = req.body;

    const user = await prisma.users.findUnique({
        where: { username: username },
    });
    
    if(user){
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch){
            res.send(user);
        } else{
            res.send({message: "Invalid Login"});
        }           
    } else {
        res.send({message: "Invalid Login" });
    }
} )



module.exports = router;