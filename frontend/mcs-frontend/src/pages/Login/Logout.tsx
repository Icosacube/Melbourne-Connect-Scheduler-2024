import React, { FC, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { login, logout } from '../../scripts/authentication/auth'

interface UserCredentials {
    username: string
    password: string
}

export const Logout: FC = () => {
    useEffect(() => {
        logout()
    })

    return (
        <Navigate to="/login" replace/>
    )
}
