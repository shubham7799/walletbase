import React from 'react'
import { useState } from 'react';
import { editContact } from '../functions';
import EditModal from './EditModal';

function Contact({name,id,address,del,setEditModal}) {

    const [modal,setModal]=useState(false)
    const [item,setItem]=useState({name:'',address:''})

  return (
    <div>
      {modal && <EditModal setEditModal={setModal} id={id} name={name} address={address} />}
    
    <div className='w-full flex py-1 '>
      
        <div className='flex grow'>
            <div className='grow'>
                <p className='px-2 text-lg line-clamp-1'>{name}</p>
            </div>
            <p className='text-base mx-8 w-60 hidden md:block '>{address}</p>
        </div>
        <div className='flex justify-end'>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="p-2 h-8 w-8 cursor-pointer rounded-full hover:bg-slate-200" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                onClick={()=>{navigator.clipboard.writeText(address);}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="ml-1 p-2 h-8 w-8 cursor-pointer rounded-full hover:bg-slate-200" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                onClick={()=>{setModal(true)}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="ml-1 p-2 h-8 w-8 cursor-pointer rounded-full hover:bg-slate-200" 
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                onClick={()=>{del(id)}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </div>

        
        
    </div>
    </div>
  )
}

export default Contact