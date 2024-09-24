import { Box } from '@mui/material'
import React, { FC, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { TripContent } from './TripContent'
import { Trip as TripType, Speaker } from '../../types/frontendTypes'
import { BodyLayout } from '../Layout/BodyLayout'
import { PageTopNavBar } from '../../components'
import { EditTripModal } from './EditTripModal'

export const Trip: FC = () => {
    const { trip, speaker } = useLoaderData() as {
        trip: TripType
        speaker: Speaker
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const openEditModal = () => {
        setIsEditModalOpen(true)
    }

    const closeEditModal = () => {
        setIsEditModalOpen(false)
    }

    return (
        <>
            <Box>
                <PageTopNavBar
                    type={'Trip'}
                    link={'/trips'}
                    pageTitle={`${trip.StartDate.format('YYYY-MM-DD')}`}
                    openEditModal={openEditModal}
                />
                <BodyLayout
                    content={<TripContent trip={trip} speaker={speaker} />}
                />
            </Box>
            <EditTripModal
                open={isEditModalOpen}
                handleClose={closeEditModal}
                trip={trip}
            />
        </>
    )
}
