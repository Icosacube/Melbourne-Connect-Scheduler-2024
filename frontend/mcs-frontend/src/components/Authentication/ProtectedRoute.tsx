import { Navigate, Outlet, useLoaderData } from 'react-router-dom'
import React, { FC, ReactNode } from 'react'
import { authGuard } from '../../scripts/authentication/auth'
import axios from 'axios'

type Props = {
    children: ReactNode
}


export const ProtectedRoute: FC = () => {
    const data = useLoaderData()

    return data ? <Outlet /> : <Navigate to="/login" />
}
