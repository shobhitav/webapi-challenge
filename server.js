
 const express= require('express');
 const projectsRouter= require('./data/helpers/project-router.js');
 const actionsRouter= require('./data/helpers/action-router.js')

const server = express();
server.use(express.json()); //parse request body as JSON
server.use('/Projects',projectsRouter);
server.use('/Actions',actionsRouter);

server.get('/', (req, res) => res.send(`<h2>Home page</h2>`));

async function validateUserId(req,res,next) {
    const  {id}= req.params;
    const user= await userDb.get(id);
    if (user){
    req.user=user;
    next();
    } else{
    res.status(400).json({message:"invalid user id"})
    }
   }


 module.exports=server;