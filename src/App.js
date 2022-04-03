import Navigation from './components/Navigation'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'; 
import SignUp from './pages/signup';
import Home from './pages/Home';
import Chat from './pages/chat';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { AppContext,socket } from './context/appContext';

function App(){
  const [rooms,setRooms] = useState([])
  const [currentRoom,setCurrentRoom] =useState([])
  const [members,setMembers] = useState([])
  const [messages,setMessages] = useState([])
  const [privateMessage,setPrivateMessage] = useState({})
  const [newMessages,setNewMessages] = useState({})
  const user = useSelector((state)=>state.user)
  return (
    <AppContext.Provider value={{socket,currentRoom,setCurrentRoom,members,setMembers,privateMessage,setPrivateMessage,messages,setMessages,rooms,setRooms,newMessages,setNewMessages}}>
      <BrowserRouter>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          {!user &
          (
            <>
               <Route path="/login" element={<Login/>}/> 
               <Route path="/signup" element={<SignUp/>}/>
            </>
          )}
         
          <Route path="/chat" element={<Chat/>}/>
        </Routes>
     </BrowserRouter>
    </AppContext.Provider>   
  );
}

export default App;
