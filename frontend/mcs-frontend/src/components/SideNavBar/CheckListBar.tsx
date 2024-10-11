import React, { FC, useState } from 'react'
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@mui/material'
import {
    Checklist as ChecklistType,
    MainEvent,
} from '../../types/frontendTypes'
import { useLocation, useParams } from 'react-router-dom'

const temp: ChecklistType = {
    RecordID: '1',
    MainEvent: ['e1'],
    EventTask: ['t1', 't2', 't3'],
    Completed: [false, true, true],
    Description: [
        'Task number 1',
        'Task number 2',
        'Task number 3 with long description',
    ],
}

export const CheckListBar: FC = () => {
    const [checklist, setChecklist] = useState<ChecklistType>(temp)
    const { id } = useParams<{ id: string }>()

    const toggleCompleted = (index: number) => {
        const updatedChecklist = { ...checklist }
        updatedChecklist.Completed[index] = !updatedChecklist.Completed[index]
        setChecklist(updatedChecklist)
    }

    // Check if the current path contains "event"
    const location = useLocation()
    const isEventPage = location.pathname.startsWith('/event/')

    return isEventPage ? (
        <Box
            sx={{
                height: '100%',
                backgroundColor: '#FFC901',
                paddingTop: 2,
                borderTop: '4px solid #FBE418', // yellow top edge
            }}
        >
            <Typography variant="h6" fontWeight={300} sx={{ marginLeft: 2 }}>
                Task List
            </Typography>
            {checklist.EventTask.map((item, index) => (
                <Card
                    key={index}
                    sx={{
                        marginX: 1.5,
                        marginY: 1,
                        backgroundColor: checklist.Completed[index]
                            ? '#000500'
                            : '#FBE418',
                        color: checklist.Completed[index] ? 'white' : 'black',
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
                                    textDecoration: checklist.Completed[index]
                                        ? 'line-through'
                                        : 'none',
                                }}
                            >
                                {checklist.Description[index]}
                                {id == null ? '' : id}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    ) : null
}
