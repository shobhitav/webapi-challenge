const express = require('express');
const router= express.Router();
const projectdB=require('./projectModel.js');


// ******************************
// PROJECTS
// ******************************


// getAll
router.get('/', (req, res) => {
    projectdB
    .get()
    .then(projects => res.status(200).json(projects))
    .catch(err=> res.status(500).json({err:'data not found'}))
}
)

// get by id
router.get('/:project_id',validateUserIdProject, (req, res) => {
const {project_id} = req.params;
projectdB
.get(project_id)
.then(projects => res.status(200).json(projects))
 .catch(err=> res.status(500).json({err:'data not found'}))
})

// insert or add
router.post('/',validatePostProject, (req, res) => {
projectdB
.insert(req.body)
.then(projects => res.status(201).json({sucess:true,projects}))
.catch(err => res.status(500).json({sucess:false,err}))
})

//delete
router.delete('/:id',validateUserIdProject, (req, res) => {
const {id}=req.params
projectdB
.remove(id)
.then(projects => res.status(200).json({sucess:true,message:'Sucessfully deleted'}))
.catch(err => res.status(500).json({sucess:false,err}))
})

//update
router.put('/:id',validateUserIdProject,(req, res) => {
const {id}=req.params;
const projectInfo=req.body;
projectdB
.update(id,projectInfo)
.then(projects => res.status(200).json({sucess:true,message:'Sucessfully Updated',projects}))
.catch(err => res.status(500).json({sucess:false,err}))
})


function validatePostProject(req,res,next) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "missing post data" });
    } else {
      if(req.body.description && req.body.name && req.body.completed) {
        // console.log(postInfo);
        next();
      } else {
        res.status(400).json({ message: "missing required description or completed or name field" });
      }
    }
  }


  async function validateUserIdProject(req,res,next) {
    const  {id}= req.params;
    const user= await projectdB.get(id);
    if (user){
    req.user=user;
    next();
    } else{
    res.status(400).json({message:"invalid user id"})
    }
   }

module.exports= router;