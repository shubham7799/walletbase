import axios from 'axios';
import cookie from 'react-cookies';

const url = process.env.REACT_APP_URL;

export const readContact=()=>axios.get(url,getConfig())
export const writeContact=contact =>axios.post(url,contact,getConfig())
export const deleteContact= id =>axios.delete(url+`/${id}`,getConfig())
export const editContact=(id,contact)=>axios.put(url+`/${id}`,contact,getConfig())

function getConfig(){
    return {
        headers: { 'Authorization': `${cookie.load('auth')}` }
    };
}