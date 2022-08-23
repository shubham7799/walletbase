import mongoose from "mongoose";
import Contact from "./contact.js";

const Schema=mongoose.Schema
const user=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    contacts:{
        type:[],
        required:true
    }
});
const User = mongoose.model('User',user);
export default User;