import axios from 'axios'

export const getAllFinanceData = async () => {
    try {
        const response = await axios.get('/finance')
        // Assuming the data is returned in response.data
        console.log('Finance data:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching finance data:', error)
        throw error // Re-throw the error for further handling if needed
    }
}
