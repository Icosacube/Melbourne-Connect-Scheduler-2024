import { Grid, Paper, Typography } from '@mui/material'
import React, { FC, useState, useEffect } from 'react'
import { Accommodation } from '../../../types/frontendTypes'
import { getFundingAccountByID } from '../../../scripts/fundingAccount/function'

interface AccomProps {
    accom: Accommodation
}

export const AccomCard: FC<AccomProps> = ({ accom }) => {
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [fundingAccountStrings, setFundingAccountStrings] =
        useState<String>('')

    useEffect(() => {
        getFundingAccountStrings(accom.FundingAccount)
    })

    async function getFundingAccountStrings(accountIds: string[]) {
        try {
            const accounts = await Promise.all(
                accountIds.map((accountId) => getFundingAccountByID(accountId))
            )
            const fundingAccountStrings = accounts.map(
                (account) => account?.ThemisString || ''
            )
            setFundingAccountStrings(fundingAccountStrings.join(', '))
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching funding accounts:', error)
        }
    }

    return (
        <Paper className="w-full px-6 py-4 rounded-lg">
            <Grid container className="flex space-between items-center">
                <Grid item xs={10} container>
                    <Grid item xs={9}>
                        <Typography variant="h6" noWrap>
                            {accom.HotelName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" noWrap>
                            {accom.Address}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Typography variant="body1">
                            Room {accom.Room}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Typography variant="body1">
                            {accom.CheckIn.format('DD MMM YY')}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Typography variant="body1">
                            {accom.CheckOut.format('DD MMM YY')}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Typography variant="body2">
                            {accom.BookingReference}
                        </Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography variant="body2" noWrap>
                            {isLoading
                                ? 'loading account..'
                                : fundingAccountStrings}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="body1">${accom.Cost}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" noWrap>
                            {accom.Notes}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <img
                        style={{ width: '100%' }}
                        src="https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc="
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default AccomCard
