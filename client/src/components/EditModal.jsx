import React from 'react'
import { useState } from 'react'
import { editContact } from '../functions'

function EditModal({setEditModal,id,name,address}) {

    const [editItem,setItem]=useState({name:name,address:address})

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 flex items-center justify-center">
        <div className='bg-white fixed w-10/12 md:w-8/12 lg:w-6/12 p-4 rounded-2xl'>
          <h2 className='text-xl mb-6'>Edit Contact</h2>
          <form className='flex flex-col' onSubmit={
            async (e)=>{
              e.preventDefault()
              if(editItem.name!=='' && editItem.address!==''){
                await editContact(id,editItem)
                window.location.reload()
              }
              else{
                window.alert("Please Enter the data")
              }
            }}>
            <input type="text" className="mb-4" defaultValue={name} placeholder='Name' onChange={
              e=>setItem({...editItem,name:e.target.value})
            }/>
            <input type="text" className="mb-4" defaultValue={address} placeholder='Wallet Address' onChange={
              e=>setItem({...editItem,address:e.target.value})
            }/>
            <div className='my-2 flex justify-end'>
              <button className='mx-2 px-4 py-2 border-2 rounded-2xl' type="submit">Add</button>
              <button className='px-4 py-2 border-2 rounded-2xl' onClick={()=>{setEditModal(false)}}>Close</button>
            </div>
            
          </form>
        </div>
      </div>
  )
}

export default EditModal