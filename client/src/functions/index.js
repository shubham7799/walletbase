import * as api from './../api/index'
export const readContact=async ()=>{
    try {
        const {data} = await api.readContact()
        return data
    }
    catch (error) {
        console.log(error.message)
    }
} 
export const writeContact=async (item)=>{
    try {
        const {data} = await api.writeContact(item)
        return data
    } 
    catch (error) {
        console.log(error.message)
    }
}

export const deleteContact=async (id)=>{
    try {
        const {data} = await api.deleteContact(id)
        return data
    } 
    catch (error) {
        console.log(error.message)
    }
}

export const editContact=async (id,contact)=>{
    try {
        const {data} = await api.editContact(id,contact)
        return data
    } 
    catch (error) {
        console.log(error.message)
    }
}