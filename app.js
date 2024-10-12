require('dotenv').config()
const express=require('express')
const bodyParser = require('body-parser'); 
const db=require('./config/db')
const cors=require('cors')
const userRoutes=require('./routes/userroutes')
const blogRoutes=require('./routes/blogroutes')


const passport=require('./config/passportconfig')
const app=express()
const PORT=process.env.PORT || 8082

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())


app.use(passport.initialize())
const local=passport.authenticate('local',{session:false})

app.use('/api/auth',userRoutes)
app.use('/api/blog',blogRoutes)



app.listen(PORT,()=>{
    console.log(`app started on port ${PORT}`)
})
