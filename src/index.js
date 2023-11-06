const express=require("express")
const userRouter=require("./routes/user.route.js")
const taskRouter=require("./routes/task.route.js")
require("./db/mongoose")

const app=express()
const PORT=process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(PORT,()=>console.log(`Server started at PORT ${PORT}`))