import express from "express";
import { deleteContact, readContact, writeContact, editContact } from "../controller/contact.js";

const contactRouter = express.Router();
contactRouter.get('/',readContact)
contactRouter.post('/',writeContact)
contactRouter.put('/:id',editContact)
contactRouter.delete('/:id',deleteContact)

export default contactRouter;