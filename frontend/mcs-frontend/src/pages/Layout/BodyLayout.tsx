import { Box, Container } from '@mui/material'
import React, { FC } from 'react'

interface BodyLayoutProps {
    content: any
}

export const BodyLayout: FC<BodyLayoutProps> = ({ content }) => {
    return (
        <Box className="flex justify-center px-12 h-fit w-full pb-12">
            <Container maxWidth={false} sx={{ maxWidth: '100%' }}>
                {content}
            </Container>
        </Box>
    )
}
