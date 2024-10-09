import React, { useState } from 'react'
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Typography,
} from '@mui/material'

type Checklist = {
    RecordID: string
    MainEvent: string[]
    EventItem: string[]
    Completed: boolean[]
    Description: string[]
}
const temp: Checklist = {
    RecordID: '1',
    MainEvent: ['e1'],
    EventItem: ['t1', 't2', 't3'],
    Completed: [false, true, true],
    Description: [
        'Task number 1',
        'Task number 2',
        'Task number 3 with long description',
    ],
}

export const Checklist: React.FC = () => {
    const [checklist, setChecklist] = useState<Checklist>(temp)

    const toggleCompleted = (index: number) => {
        const updatedChecklist = { ...checklist }
        updatedChecklist.Completed[index] = !updatedChecklist.Completed[index]
        setChecklist(updatedChecklist)
    }

    return (
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
            {checklist.EventItem.map((item, index) => (
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
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    )
}
