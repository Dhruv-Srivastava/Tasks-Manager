const mongoose=require("mongoose")
const validator=require("validator")


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

module.exports=User