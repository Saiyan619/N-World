import React from 'react'
import { getUserAuth } from '../utils/Context';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const { User } = getUserAuth();
    const navigate = useNavigate();


        if (!User) {
         return navigate('/');
        }
    
    return children;
}

export default ProtectedRoutes