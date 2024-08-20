import React, { FC } from 'react'
import { FinanceTable } from './FinanceTable'
import { Finance as FinanceType, MainEvent } from '../../types/frontendTypes'
import { useLoaderData } from 'react-router-dom'

type FinanceRow = FinanceType & {
    EventName: string
    EventTotalCost?: number
    isGroup?: boolean
}

export const Finance: FC = () => {
    const { updatedFinanceData, events } = useLoaderData() as {
        updatedFinanceData: FinanceType[]
        events: MainEvent[]
    }

    return <FinanceTable rows={updatedFinanceData} events={events} />
}
