import mongoose from "mongoose";

const Schema=mongoose.Schema
const contact=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
        unique:true
    }
});
const Contact = mongoose.model('Contact',contact);
export default Contact;