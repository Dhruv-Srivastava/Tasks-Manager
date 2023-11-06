const express=require("express")
const User=require("../models/user.model.js")
const router=new express.Router()

// Create

router.post("/users",async (req,res)=>{
    const newUser=new User(req.body);

    try{
        const user=await newUser.save()
        res.status(201).send(user)
    }catch(error){
        res.status(400).send("Bad Request")
    }
})

// Read

router.get("/users",async (req,res)=>{

    try{
       const users=await User.find({})
       res.status(200).json(users)
    }catch(error){
        res.status(500).send()
    }
   
})

router.get("/users/:_id",async (req,res)=>{
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

// Update

router.patch("/users/:_id",async (req,res)=>{

    const _id=req.params._id;
    const updates=Object.keys(req.body)
    const allowedUpdates=["name","email","password","age"]

    const isAllowed=updates.every(update=>allowedUpdates.includes(update))

    if(!isAllowed)
        res.status(400).send("Bad Request")

    try{

        // findByIdAndUpdate will bypass our pre middleware

        // const updatedUser=await User.findByIdAndUpdate(_id,req.body,{new:true,runValidators:true}) 
        const user=await User.findById(_id)
        

        if(!user){
            res.status(404).send("User not found")
        }

        updates.forEach(update=>user[update]=req.body[update])

        const updatedUser=await user.save()
        
        res.status(202).send(updatedUser)
    }catch(error){
        console.log(error)
        res.status(500).send()
    }
})

// Delete

router.delete("/users/:_id",async (req,res)=>{
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

module.exports=router