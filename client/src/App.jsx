import { useEffect, useState } from 'react';
import './App.css';
import { readContact, writeContact } from './api';
import Contact from './components/Contact';
import jwt_decode from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import cryptojs from 'crypto-js';
import cookie from 'react-cookies'
import About from './components/About';
import { deleteContact } from './functions';
import EditModal from './components/EditModal';
import AddModal from './components/AddModal';

function App() {

  const [items,setItems]=useState([])
  const [searchResults,setSearchResults]=useState([])
  const [modal,setModal]=useState(false)
  const [editModal,setEditModal]=useState(false)
  const [isLoggedIn,setLoggedIn]=useState(false);
  const [user,setUser]=useState(null);

  useEffect(()=>{
    
    const key=process.env.REACT_APP_KEY;
    const encryptedText=cookie.load('auth');
    if(encryptedText!==undefined){
      fetchData();
      const data=JSON.parse(cryptojs.AES.decrypt(encryptedText,key).toString(cryptojs.enc.Utf8));
      setUser({image:data.picture,fname:data.given_name,lname:data.family_name});
      setLoggedIn(true);
    }
    
  },[])
  
  const fetchData=async()=>{
      const result=await readContact();
      result.data.contacts.sort((a, b) => a.name.localeCompare(b.name))
      setItems(result.data.contacts)
      setSearchResults(result.data.contacts)
  }

  async function del(id){
    const result=await deleteContact(id);
    console.log(result)
    result.sort((a, b) => a.name.localeCompare(b.name));
    setItems(result);
    setSearchResults(result);
  }

  function search(keyword){
    const search_results = items
    .filter(i => {
        return i.name.toLowerCase().includes(keyword.toLowerCase());
    });
    setSearchResults(search_results);
  }

  function download(){
      var csv = 'Name, Address\n';
      items.forEach(function(row) {
          csv += row.name+','+row.address;
          csv += "\n";
      });

      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
      hiddenElement.target = '_blank';
      hiddenElement.download = 'contacts.csv';
      hiddenElement.click();
  }

  return (
    <div className='app'>
      <header className='fixed top-0 z-0 bg-white w-full'>
        <nav className='px-2 py-4 sm:px-4 md:px-6 flex justify-between items-center'>
          <h2 className='font-bold text-lg'>WalletBase</h2>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_API_ID}>
            {!isLoggedIn && <GoogleLogin
              onSuccess={credentialResponse => {
                const decoded=jwt_decode(credentialResponse.credential);
                const key=process.env.REACT_APP_KEY;
                const encryptedText=cryptojs.AES.encrypt(JSON.stringify(decoded),key).toString();
                cookie.save('auth', encryptedText, { path: '/' });
                setUser({image:decoded.picture,fname:decoded.given_name,lname:decoded.family_name});
                setLoggedIn(true);
                fetchData();
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />}
            {isLoggedIn && <div>
                <button className='flex border rounded-md border-gray-400 p-2'
                  onClick={()=>{
                    cookie.remove('auth');
                    setLoggedIn(false);
                  }}>
                  <img className='h-6 w-6 mr-2 rounded-full ' src={user.image} alt="" />
                  <p className='font-bold'>Logout</p>  
                </button>
              </div>
            }
          </GoogleOAuthProvider>
        </nav>
        {(isLoggedIn && items.length!==0) && <><div className='p-4 w-full flex space-x-4 md:px-12 lg:px-24'>
          
          <input className='p-2 w-full rounded-lg 
              border-2 border-gray-500
              focus:border-2 bg-gray-100 
              outline-none
              focus:border-black focus:bg-white'
              type="text" 
              onChange={(e)=>{search(e.target.value);}}
              placeholder='Search' />
              <button onClick={()=>{setModal(true)}} className='rounded-full px-4 border-2 border-black'>
                <p className='text-base font-semibold'>+New</p>
              </button>
        </div>
        <div className='px-4 md:px-12 lg:px-24'>
          <div className='flex flex-row mt-6 mb-4 place-content-end space-x-4 items-center'>
            <div className='cursor-pointer w-32 p-1 border-2 font-medium rounded-lg border-black text-center' onClick={()=>{download()}}>Export to Excel</div>
            <h2 className='font-semibold text-lg text-right'>{searchResults.length} Contacts</h2>
          </div>
          <div className='flex'>
            <p className='px-2 font-semibold grow'>Name</p>
            <p className='w-80 mr-14 font-semibold hidden md:block'>Address</p>
          </div>
          <div className='h-px my-2 mb-0 w-full bg-black'></div>
        </div></>}
      </header>
      {(isLoggedIn  && items.length!==0) && <div className='px-4 md:px-12 lg:px-24 mt-64 '>
        <div className='contacts'>
            {searchResults.map(i=>{
                return <Contact name={i.name} id={i._id} address={i.address} del={del} setEditModal={setEditModal} />
            })}
        </div>
      </div>}
      {!isLoggedIn && <About />}

      {(isLoggedIn && items.length===0) && 
        <div className='h-screen flex flex-col justify-center items-center'>
          <div className='px-4'>
              <button 
                onClick={()=>{setModal(true)}}
                className='font-semibold text-3xl border-black border-2 rounded-full p-4 px-8'>
                  Add First Contact
              </button>
          </div>
        </div>
      }
      
      {modal && <AddModal setAddModal={setModal} />}

      {/* {editModal && <EditModal setEditModal={setEditModal} />} */}
      
    </div>
  );
}

export default App;

