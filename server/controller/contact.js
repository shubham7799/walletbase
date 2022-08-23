import mongoose from "mongoose";
import Contact from "../models/contact.js";
import User from "../models/user.js"
import cryptojs from "crypto-js";
import dot from 'dotenv'
import express from 'express'

function decodeToken(token){
    dot.config();
    const decoded  = JSON.parse(cryptojs.AES.decrypt(token,process.env.TOKEN_KEY).toString(cryptojs.enc.Utf8));
    return decoded.email;
}

export const readContact = async(req,res)=>{
    const userEmail = decodeToken(req.headers.authorization);
    try {
        const contacts=await User.findOne({email:userEmail})
        res.status(200).json(contacts)
    } 
    catch (error) {
        res.status(404).json({error:error.message})
    }
}

export const writeContact = async(req,res)=>{
    const userEmail = decodeToken(req.headers.authorization);
    console.log(req.body.name)
    const c={name:req.body.name,address:req.body.address}
    try {
        const r=await User.findOneAndUpdate({email:userEmail},{ $push: { contacts: Contact(c) } });
        if(r==null){
            const item=new User({email:userEmail,contacts:[Contact(c)]});
            await item.save();
        }
        res.status(201).json(c);
    } 
    catch (error) {
        res.status(409).json({error:error.message})
    }
}

export const editContact = async(req,res)=>{
    const userEmail = decodeToken(req.headers.authorization);
    const {id}=req.params
    const contact=req.body
    console.log(id)
    console.log(contact)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`The id ${id} is not valid`);
    }
    const obj=await User.findOne({email:userEmail});
    var contacts=obj.contacts
    for(var i=0;i<contacts.length;i++){
        if(contacts[i]._id.toString().includes(id)){
            contacts[i]={...contacts[i],name:contact.name,address:contact.address};
            break
        }
    }
    await User.findOneAndUpdate({email:userEmail},{contacts: contacts})
    
    res.status(200).json(contacts)
}

export const deleteContact = async(req,res)=>{
    const userEmail = decodeToken(req.headers.authorization);
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`The id ${id} is not valid`);
    }
    // const o=await User.findOne({email:userEmail,'contacts._id':id},{'contacts.$':1})
    const obj=await User.findOne({email:userEmail});
    const contacts=obj.contacts.filter(i => {
        return !(i._id.toString()).includes(id);
    });
    await User.findOneAndUpdate({email:userEmail},{contacts: contacts})
    
    res.status(200).json(contacts)
}