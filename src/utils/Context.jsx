import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../utils/FirebaseConfig';


const UserAuth = createContext();

export const ContextProvider = ({ children }) => {
    const [User, setUser] = useState(null);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        });
    
      return () => unsubscribe()
    }, [])

    
    
    const login = (email ,password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }
 
    // as for the sign up function check the component itself

    const logOut = () => {
        return signOut(auth);
    }


    return (
        <UserAuth.Provider value={{ User, login, logOut }}>{children}</UserAuth.Provider>
  )
}

// context function
export const getUserAuth = () => {
   return useContext(UserAuth)
}


