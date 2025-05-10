import React, { type PropsWithChildren } from 'react';
import { useAuth } from '../hooks/queries/useAuth';
import { AuthContext } from '../contexts/AuthContext';

export const AuthProvider:React.FC<PropsWithChildren> = ({children}) => {
    const auth = useAuth();
   
    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}