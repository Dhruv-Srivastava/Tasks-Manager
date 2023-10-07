require("dotenv").config()
const mongoose=require("mongoose")
const validator=require("validator")
mongoose.connect(process.env.CONNECTION_STRING);


const User= mongoose.model("User",{
    name:{
        type:String,
        trim:true,
        required:true,
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0)
                throw new Error("Age can't be negative")
        }
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(text){
            if(!validator.isEmail(text))
                throw new Error("Please enter a valid email address!")
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length<6)
                throw new Error("Password must be of atleast length 6.")

            else if(value.includes("password".toLowerCase()))
                throw new Error("Password can't contain 'password' in it.")
        }
    }
})

// const me= new User({
//     name:"Dhruv",
//     age:23,
//     email:"abc@xyz.com",
//     password:"password"

// })

// me.save()
// .then((me)=>{
//     console.log("Everything worked fine!")
// })
// .catch(err=>{
//     console.error(err)
// })

const Task=mongoose.model("Task",{
    description:{
        type:String,
        trim:true,
        required:true,
    },
    completed:{
        type:Boolean,
        default:false 
    },
    
})

const newTask=new Task({
    description:"This is my demo task",
})

newTask.save().
    then(task=>console.log("Task created")).
    catch(err=>console.error(err))