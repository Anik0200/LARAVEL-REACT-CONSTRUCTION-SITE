import React, { useContext } from 'react'
import { AuthContext } from '../Backend/Context/Auth';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {

    const { user } = useContext(AuthContext);

    return user ? children : <Navigate to="/admin/login" />
}

export default RequireAuth
