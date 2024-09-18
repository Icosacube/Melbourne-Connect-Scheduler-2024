import { Navigate, Outlet, useLoaderData } from 'react-router-dom'
import React, { FC, ReactNode } from 'react'
import { authGuard } from '../../scripts/authentication/auth'
import axios from 'axios'
import { useAuth } from '../../scripts/authentication/authContext'

export const ProtectedRoute = () => {
    const data = useLoaderData()
    const { token, authGuard } = useAuth()

    if (token) {
        return <Outlet />
    } else {
        authGuard().then(() => {
            return <Navigate to="/login" />
        })
        return <Navigate to="/login" />
    }
}
