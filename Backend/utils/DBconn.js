const mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_URL)
.then(res=>console.log("database connected"))
.catch(err=>console.log(`Database Error: ${err.message}`))