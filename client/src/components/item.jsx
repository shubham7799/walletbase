import React from 'react'
import { deleteContact } from '../functions'
import './item.css'

function Item({id,name,desc,category}) {

        const removeItem=async(id)=>{
            await deleteContact(id);
        }


  return (
    <div className='item'>
        <div className="top">
            <div className="title">
                <h3>{name}</h3>
                <p>{category}</p>
            </div>
            <p>{desc}</p>
        </div>
        
        <div className="bottom">
            <button className="investButton" onClick={() => {
              }}
                >Invest</button>
            <button className='deleteButton' onClick={() => {
                removeItem(id)
                window.location.reload()
              }}
            >🗑️</button>
        </div>
    </div>
  )
}

export default Item