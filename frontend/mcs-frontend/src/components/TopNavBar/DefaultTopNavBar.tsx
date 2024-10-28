import { Toolbar, Typography } from '@mui/material'
import React from 'react'

interface DefaultTopNavBarProps {
    pageName: string | undefined
}

const DefaultTopNavBar: React.FC<DefaultTopNavBarProps> = ({ pageName }) => {
    return (
        <Toolbar
            className="bg-white h-24 shadow-md w-full mb-6 "
            style={{ position: 'sticky', top: 0, zIndex: 1000 }}
        >
            <Typography variant="h2" className="ml-6">
                {pageName}
            </Typography>
        </Toolbar>
    )
}

export default DefaultTopNavBar
