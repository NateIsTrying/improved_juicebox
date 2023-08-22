const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');

const main = async() => {
    try {
        const user1 = {
            username: "JamesTKirk",
            password: await bcrypt.hash("originalCap1966", 10) 
        }
        
        const user2 = {
            username: "BenjaminSisko",
            password: await bcrypt.hash("deepSpace9Best", 10) 
        }
        
        const user3 = {
            username: "ChrisPine",
            password: await bcrypt.hash("prettyGood2009", 10) 
        }
        
        const createdUser1 = await prisma.users.create({
            data: user1
        })
        
        const createdUser2 = await prisma.users.create({
            data: user2
        })
        
        const createdUser3 = await prisma.users.create({
            data: user3
        })
        // Need to make at least three posts for each user
        console.log("Starting to seed/create posts...");
    
        const posts = [
            {
                title: "No Mistakes",
                content: "It is possible to commit no mistakes and still lose. That is not weakness, that is life.",
                userId: createdUser1.id,
            },
            {
                title: "Guilty Conscience",
                content: "Garak was right about one thing: a guilty conscience is a small price to pay for the safety of the Alpha quadrant.",
                userId: createdUser2.id,
            },
            {
                title: "Revenge Isn't the Answer",
                content: "Our First Instinct Is To Seek Revenge When Those Who We Love Are Taken From Us. But That's Not Who We Are..",
                userId: createdUser3.id,
            },
        ];

        for(const post of posts) {
            await prisma.posts.create({ data: post })
        }

        console.log("Finished seeding/creating posts!");
    } catch (error) {
        console.log('Uh Oh, something went wrong...', error);
    }
        

    


};

main();