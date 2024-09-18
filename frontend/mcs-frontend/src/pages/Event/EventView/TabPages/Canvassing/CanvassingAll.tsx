import React, { useEffect, useState } from 'react'
import {
    Grid,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
    CircularProgress,
    Box,
} from '@mui/material'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl'
import {
    Canvassing,
    MainEvent,
    Speaker,
} from '../../../../../types/frontendTypes'
import CanvassingCreation from './CanvassingCreation'
import { CanvassingResultsFC } from './CanvassingResultsFC'
import { CanvassingResultsTable } from './CanvassingResultsTable'
import { getCanvassingByEventId } from '../../../../../scripts/canvassing/functions'

interface CanvassingAllProps {
    event: MainEvent
    speakers: Speaker[]
}

export const CanvassingAll: React.FC<CanvassingAllProps> = ({
    event,
    speakers,
}) => {
    const [hasCanvassing, setHasCanvassing] = useState<boolean>(false)
    const [activeComponent, setActiveComponent] = useState<string>('')
    const [canvassingSlots, setCanvassingSlots] = useState<Canvassing[]>([])

    useEffect(() => {
        getCanvassingByEventId(event.RecordID).then((canvassingSlots) => {
            setCanvassingSlots(canvassingSlots)
            const hasCanvassing =
                canvassingSlots && canvassingSlots.length > 0 && event != null
            hasCanvassing ? setActiveComponent('B') : setActiveComponent('A')
            setHasCanvassing(hasCanvassing)
        })
    }, [event])

    const renderComponent = () => {
        switch (activeComponent) {
            case 'A':
                return hasCanvassing ? null : (
                    <CanvassingCreation
                        event={event}
                        canvassingSlots={canvassingSlots}
                    />
                )
            case 'B':
                return hasCanvassing ? (
                    <CanvassingResultsFC
                        event={event}
                        speakers={speakers}
                        canvassingSlots={canvassingSlots}
                    />
                ) : null
            case 'C':
                return hasCanvassing ? (
                    <CanvassingResultsTable
                        event={event}
                        speakers={speakers}
                        canvassingSlots={canvassingSlots}
                    />
                ) : null
            default:
                return (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                )
        }
    }

    const getTitle = () => {
        switch (activeComponent) {
            case 'A':
                return 'Canvassing Form Creation'
            case 'B':
                return 'Canvassing Results (Calendar)'
            case 'C':
                return 'Canvassing Results (Table)'
            default:
                return hasCanvassing
                    ? 'Canvassing Results (Calendar)'
                    : 'Canvassing Form Creation'
        }
    }

    return (
        <Grid container direction="column" spacing={2}>
            <Grid
                item
                container
                alignItems="center"
                justifyContent="space-between"
            >
                <Grid item>
                    <Typography variant="h4" gutterBottom>
                        {getTitle()}
                    </Typography>
                </Grid>
                <Grid item>
                    <ToggleButtonGroup
                        value={activeComponent}
                        exclusive
                        onChange={(event, newAlignment) => {
                            if (newAlignment !== null) {
                                setActiveComponent(newAlignment)
                            }
                        }}
                        aria-label="component switch"
                    >
                        <Tooltip
                            title="Form Creation"
                            aria-label="Form Creation"
                        >
                            <ToggleButton value="A">
                                <EditCalendarIcon />
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip
                            title="Results Calendar"
                            aria-label="Results Calendar"
                        >
                            <ToggleButton value="B">
                                <CalendarMonthIcon />
                            </ToggleButton>
                        </Tooltip>
                        <Tooltip
                            title="Results Table"
                            aria-label="Results Table"
                        >
                            <ToggleButton value="C">
                                <ChecklistRtlIcon />
                            </ToggleButton>
                        </Tooltip>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>

            {/* The main component */}
            <Grid item xs={12}>
                {renderComponent()}
            </Grid>
        </Grid>
    )
}

export default CanvassingAll
