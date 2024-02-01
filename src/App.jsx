import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { ContextProvider } from './utils/Context';
import { getUserAuth } from './utils/Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
function App() {
  // const { User } = getUserAuth();
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          
        <Routes>
          {/* {User ? 'hi' : 'hey'} */}
            <Route path='/' element={<Login />} />
            <Route path='/chats' element={<ProtectedRoutes> <Chat /> </ProtectedRoutes>}  />
        <Route path='/signup' element={<SignUp />} />
            </Routes>
          </BrowserRouter>
      </ContextProvider>
      
    </>
  )
}


export default App
