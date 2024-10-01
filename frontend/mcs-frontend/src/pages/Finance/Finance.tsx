import { FC } from 'react'
import { useLoaderData } from 'react-router-dom'
import { Finance as FinanceType } from '../../types/frontendTypes'
import { FinanceTable } from './FinanceTable'

export const Finance: FC = () => {
    const { financeData } = useLoaderData() as {
        financeData: FinanceType[]
    }

    return <FinanceTable rows={financeData} />
}
