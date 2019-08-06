const express = require('express');
const router= express.Router();
const actiondB=require('./actionModel.js');

// ******************************
// ACTIONS
// ******************************
router.get('/', (req, res) => {
    actiondB.get()
    .then(
        actions => res.status(200).json(actions)
    )
     .catch(
        err=> res.status(500).json({err:'data not found'})
     )
})

// get by id
router.get('/:id',validateUserIdAction, (req, res) => {
    const {id} = req.params;
    actiondB
    .get(id)
    .then(actions => res.status(200).json(actions))
     .catch(err=> res.status(500).json({err:'data not found'}))
    })
    

// insert or add
router.post('/',validatePostAction , (req, res) => {
   actiondB
    .insert(req.body)
    .then(actions => res.status(201).json({sucess:true,actions}))
    .catch(err => res.status(500).json({sucess:false,err}))
    })

//delete
router.delete('/:id',validateUserIdAction, (req, res) => {
    const {id}=req.params
    actiondB
    .remove(id)
    .then(actions => res.status(200).json({sucess:true,message:'Sucessfully deleted'}))
    .catch(err => res.status(500).json({sucess:false,err}))
    })
    
//update
router.put('/:id',validateUserIdAction, (req, res) => {
    const {id}=req.params;
    const actionInfo=req.body;
    actiondB
    .update(id,actionInfo)
    .then(actions => res.status(200).json({sucess:true,message:'Sucessfully Updated',actions}))
    .catch(err => res.status(500).json({sucess:false,err}))
    })


    async function validateUserIdAction(req,res,next) {
        const  {id}= req.params;
        const user= await actiondB.get(id);
        if (user){
        req.user=user;
        next();
        } else{
        res.status(400).json({message:"invalid user id"})
        }
       }
    function validatePostAction(req,res,next) {
        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
          res.status(400).json({ message: "missing post data" });
        } else {
          if(req.body.description && req.body.completed && req.body.notes) {
            // console.log(postInfo);
            next();
          } else {
            res.status(400).json({ message: "missing required description or notes or completed field" });
          }
        }
      }

 module.exports=router;
