import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Homepage: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/dashboard')
    }, [navigate])

    return null // No UI is rendered as the user is redirected
}
