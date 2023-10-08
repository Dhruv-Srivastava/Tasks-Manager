const express=require("express")
const User=require("./models/user")
const Task=require("./models/task")

require("./db/mongoose")


const app=express()
const PORT=process.env.PORT || 3000

app.use(express.json())

// Create

app.post("/users",async (req,res)=>{
    const newUser=new User(req.body);

    try{
        const user=await newUser.save()
        res.status(201).send(user)
    }catch(error){
        res.status(400).send("Bad Request")
    }
})

app.post("/tasks",async (req,res)=>{
    const newTask=new Task(req.body);

    try{
        const task=await newTask.save()
        res.status(201).send(task)
    }catch(error){
        res.status(400).send("Bad Request")
    }
})


// Read

app.get("/users",async (req,res)=>{

    try{
       const users=await User.find({})
       res.status(200).json(users)
    }catch(error){
        res.status(500).send()
    }
   
})

app.get("/users/:_id",async (req,res)=>{
    const _id=req.params._id
    try{
        const user=await User.findById(_id)
        if(!user){
            res.status(404).send("User Not Found")
        }
        res.status(200).send(user)
    }catch(error){
        res.status(500).send()
    }

})

app.get("/tasks",async (req,res)=>{
    try{
        const tasks=await Task.find({})
        res.status(200).json(tasks)
     }catch(error){
         res.status(500).send()
     }
})

app.get("/tasks/:_id",async (req,res)=>{
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

app.patch("/users/:_id",async (req,res)=>{

    const _id=req.params._id;
    const updates=Object.keys(req.body)
    const allowedUpdates=["name","email","password","age"]

    const isAllowed=updates.every(update=>allowedUpdates.includes(update))

    if(!isAllowed)
        res.status(400).send("Bad Request")

    try{
        const updatedUser=await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true})
        if(!updatedUser){
            res.status(404).send("User not found")
        }
        res.status(202).send(updatedUser)
    }catch(error){
        res.status(500).send()
    }
})

app.patch("/tasks/:_id",async (req,res)=>{

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

app.delete("/users/:_id",async (req,res)=>{
    const _id=req.params._id
    try{
        const user=await User.findByIdAndDelete(_id)
        if(!user){
            res.status(404).send("User not found")
        }
        res.status(202).send(user)
    }catch(error){
        res.status(500).send()
    }
})


app.delete("/tasks/:_id",async (req,res)=>{
    const _id=req.params._id
    try{
        const task=await Task.findByIdAndDelete(_id)
        if(!task){
            res.status(404).send("Task not found")
        }
        res.status(202).send(user)
    }catch(error){
        res.status(500).send()
    }
})

app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`))