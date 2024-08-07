import { Box, Grid, Typography } from '@mui/material'
import React, { FC } from 'react'
import Accomodation from './TabPages/Accomodation'
import Costs from './TabPages/Costs'
import TravelView from './TabPages/TravelView'
import TravelEdit from './TabPages/TravelEdit'

export const TripsTab: FC = () => {
    return (
        <Box className="w-full">
            <Grid
                container
                className="flex justify-between items-center"
                spacing={2}
            >
                <Grid item xs={12}>
                    <Typography>Flight Tickets</Typography>
                </Grid>
                <Grid item md={12} lg={6}>
                    <TravelView />
                </Grid>
                <Grid item md={12} lg={6}>
                    <TravelEdit />
                </Grid>
                <Grid item md={12}>
                    <Accomodation />
                </Grid>
                <Grid item md={12}>
                    <Costs />
                </Grid>
            </Grid>
        </Box>
    )
}
