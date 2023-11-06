const express=require("express")
const Task=require("../models/task.model.js")
const router=new express.Router()

// Create

router.post("/tasks",async (req,res)=>{
    const newTask=new Task(req.body);

    try{
        const task=await newTask.save()
        res.status(201).send(task)
    }catch(error){
        res.status(400).send("Bad Request")
    }
})

// Read

router.get("/tasks",async (req,res)=>{
    try{
        const tasks=await Task.find({})
        res.status(200).json(tasks)
     }catch(error){
         res.status(500).send()
     }
})

router.get("/tasks/:_id",async (req,res)=>{
    const _id=req.params._id
    try{
        const task=await Task.findById(_id)
        if(!task){
            res.status(404).send("User Not Found")
        }
        res.status(200).send(task)
    }catch(error){
        res.status(500).send()
    }
})

// Update


router.patch("/tasks/:_id",async (req,res)=>{

    const _id=req.params._id;
    const updates=Object.keys(req.body)
    const allowedUpdates=["description","completed"]

    const isAllowed=updates.every(update=>allowedUpdates.includes(update))

    if(!isAllowed)
        res.status(400).send("Bad Request")

    try{
        const updatedTask=await Task.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        if(!updatedTask){
            res.status(404).send("Task not found")
        }
        res.status(202).send(updatedTask)
    }catch(error){
        res.status(500).send()
    }
})

// Delete


router.delete("/tasks/:_id",async (req,res)=>{
    const _id=req.params._id
    try{
        const task=await Task.findByIdAndDelete(_id)
        if(!task){
            res.status(404).send("Task not found")
        }
        res.status(202).send(task)
    }catch(error){
        res.status(500).send()
    }
})

module.exports=router