import React, { FC, useEffect, useState } from 'react'
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@mui/material'
import { Checklist as ChecklistType } from '../../types/frontendTypes'
import { useLocation, useParams } from 'react-router-dom'
import {
    defaultChecklist,
    getChecklistByEventID,
    createNewChecklist,
    updateChecklist,
} from '../../scripts/checklist/function'
import { AddButton } from '../Buttons'

export const CheckListBar: FC = () => {
    const [checklist, setChecklist] = useState<ChecklistType | null>(
        defaultChecklist
    )
    const location = useLocation()
    const { id: eventId } = useParams<{ id: string }>()

    const isEventPage = location.pathname.startsWith('/event/')

    const toggleCompleted = async (index: number) => {
        if (checklist) {
            const updatedChecklist = { ...checklist }
            updatedChecklist.Completed[index] =
                !updatedChecklist.Completed[index]
            setChecklist(updatedChecklist)
            await updateChecklist(updatedChecklist)
        }
    }

    const fetchChecklist = async () => {
        if (isEventPage && eventId) {
            try {
                const fetchedChecklist = await getChecklistByEventID(eventId)
                setChecklist(fetchedChecklist[0] || null)
            } catch (error) {
                setChecklist(null)
            }
        } else {
            setChecklist(defaultChecklist)
        }
    }

    // Function to handle creating a new checklist
    const createChecklist = async () => {
        if (isEventPage && eventId) {
            const checklist = defaultChecklist
            defaultChecklist.MainEvent = [eventId]
            const status = await createNewChecklist(checklist)
            if (status === 200) {
                fetchChecklist()
            } else {
                console.error('Failed to create checklist')
            }
        }
    }

    useEffect(() => {
        fetchChecklist()
    }, [eventId])

    return isEventPage ? (
        <Box
            sx={{
                height: 'calc(100vh - 396px)',
                backgroundColor: '#FFC901',
                paddingTop: 2,
                borderTop: '4px solid #FBE418',
                overflowY: 'scroll',
                display: 'block',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
            }}
        >
            <Typography variant="h6" fontWeight={300} sx={{ marginLeft: 2 }}>
                Task List
            </Typography>
            {checklist != null ? (
                checklist.EventTask.map((item, index) => (
                    <Card
                        key={index}
                        sx={{
                            marginX: 1.5,
                            marginY: 1,
                            backgroundColor: checklist.Completed[index]
                                ? '#181818'
                                : '#FBE418',
                        }}
                    >
                        <CardActionArea onClick={() => toggleCompleted(index)}>
                            <CardContent sx={{ padding: '10px' }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontSize: 13,
                                        color: checklist.Completed[index]
                                            ? 'white'
                                            : 'black',
                                        textDecoration: checklist.Completed[
                                            index
                                        ]
                                            ? 'line-through'
                                            : 'none',
                                    }}
                                >
                                    {checklist.Description[index]}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))
            ) : (
                <Box sx={{ marginX: 1.5, marginY: 2 }}>
                    <AddButton name="New" onClick={createChecklist} />
                </Box>
            )}
        </Box>
    ) : null
}
