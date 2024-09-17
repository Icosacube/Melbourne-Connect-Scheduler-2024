import { Navigate } from 'react-router-dom'
import React, { ReactNode } from 'react'
import { getCookie } from '../../scripts/cookie/function'

type Props = {
    children: ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
    const user = getCookie('login')
    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
}
