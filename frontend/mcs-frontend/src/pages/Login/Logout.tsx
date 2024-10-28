import { FC, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { logout } from '../../scripts/authentication/auth'

export const Logout: FC = () => {
    useEffect(() => {
        logout()
    })

    return <Navigate to="/login" replace />
}
