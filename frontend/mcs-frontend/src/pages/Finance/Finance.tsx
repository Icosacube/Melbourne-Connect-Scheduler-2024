import React, { FC } from 'react'
import { FinanceTable } from './FinanceTable'
import { Finance as FinanceType, MainEvent } from '../../types/frontendTypes'
import { useLoaderData } from 'react-router-dom'
import { Box } from '@mui/material'

type FinanceRow = FinanceType & {
    EventName: string
    EventTotalCost?: number
    isGroup?: boolean
}

export const Finance: FC = () => {
    const { financeData } = useLoaderData() as {
        financeData: FinanceType[]
    }

    return (
        <Box
            sx={{
                height: '80vh',
            }}
        >
            <FinanceTable rows={financeData} />
        </Box>
    )
}
