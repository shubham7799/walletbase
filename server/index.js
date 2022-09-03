import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import contactRouter from './routes/contact.js'

const app=express();
dotenv.config();
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/contacts',contactRouter)
const mongodb="mongodb+srv://"+process.env.USER+":"+process.env.PASSWORD+"@cluster0.1c4js.mongodb.net/ContactDatabase?retryWrites=true&w=majority"
app.get('/',(req,res)=>{
    res.send('Welcome to Server');
})


mongoose.connect(mongodb).then(
    app.listen(process.env.PORT || 3000,()=>console.log(`server is running on port`))
);