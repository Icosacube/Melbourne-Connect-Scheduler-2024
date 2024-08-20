import { LoaderFunctionArgs } from 'react-router-dom'
import { getAllFinanceData } from './function'

export async function loader({ params }: LoaderFunctionArgs): Promise<any> {
    try {
        const financeData = await getAllFinanceData()
        return financeData
    } catch (error) {
        console.log(error)
        return {}
    }
}
