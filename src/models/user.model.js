const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")


const userSchema=new mongoose.Schema({
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


// pre is a middleware which runs before some action, in our case it's before saving the document to the database

userSchema.pre("save", async function(next){
    // 'this' will have access to the current document that's about to be saved 
    const user=this
    
    // Hash the password iff the password is changed or created.

    if(user.isModified("password")){
        user.password=await bcrypt.hash(user.password,8)
    }
    
    next()
})

const User= mongoose.model("User",userSchema)

module.exports=User