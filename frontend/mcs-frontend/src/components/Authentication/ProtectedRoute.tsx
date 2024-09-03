import { Navigate } from 'react-router-dom'
import { useAuth } from '../../scripts/authentication/authProvider'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
    const user = localStorage.getItem('session')
    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}
