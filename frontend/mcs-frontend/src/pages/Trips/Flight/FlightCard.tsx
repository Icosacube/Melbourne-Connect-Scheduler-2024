import { Grid, IconButton, Paper, Typography } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { Flight } from '../../../types/frontendTypes'
import EditIcon from '@mui/icons-material/Edit'
import { getFundingAccountByID } from '../../../scripts/fundingAccount/function'
interface FlightProps {
    flight: Flight
}

export const FlightCard: FC<FlightProps> = ({ flight }) => {
    const [isLoading, setIsLoading] = useState<Boolean>(true)
    const [fundingAccountStrings, setFundingAccountStrings] =
        useState<String>('')

    useEffect(() => {
        getFundingAccountStrings(flight.FundingAccount)
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
        <Paper className="px-5 pb-4 pt-2 rounded-lg">
            <Grid
                container
                className="w-full flex justify-between items-center space-y-0.5"
            >
                <Grid item xs={3}>
                    <Typography noWrap variant="body2">
                        {flight.Airline}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography noWrap variant="body2">
                        {flight.FlightNumber}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography noWrap variant="body2">
                        {flight.FlightReference == ''
                            ? 'unknown'
                            : flight.FlightReference}
                    </Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton>
                        <EditIcon
                            sx={{
                                fontSize: 18,
                                alignItems: 'right',
                                m: 0,
                                p: 0,
                            }}
                        />
                    </IconButton>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="h6">{flight.DepartureFrom}</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography variant="h6">{flight.ArrivedTo}</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="body2">
                        {flight.DepartDate.format('HH:mm A')}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="body2">
                        {flight.ArriveDate.format('HH:mm A')}
                    </Typography>
                </Grid>

                <Grid item xs={3}>
                    <Typography variant="body2" noWrap>
                        {isLoading
                            ? 'loading account..'
                            : fundingAccountStrings}
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="body2">
                        {flight.DepartDate.format('DD MMM YY')}
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="body2">
                        {flight.ArriveDate.format('DD MMM YY')}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body1" align="right">
                        ${flight.Cost}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default FlightCard
