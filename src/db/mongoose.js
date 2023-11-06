require("dotenv").config()
const mongoose=require("mongoose")

async function connectToDB(){
    try{
        const connection=await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database successfully connected.")
    }catch(error){
        console.log("Mongo DB connection failed:",error)
    }
}

connectToDB()



