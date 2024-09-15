// CanvassingResultsFCSidebar.tsx
import React from 'react'
import { Grid, TextField, Typography } from '@mui/material'
import { Canvassing } from '../../../../types/frontendTypes'

interface CanvassingResultsFCSidebarProps {
    academicFilter: string
    setSpeakerFilter: (value: string) => void
    selectedSlot: Canvassing | null
}

export const CanvassingResultsFCSidebar: React.FC<
    CanvassingResultsFCSidebarProps
> = ({ academicFilter, setSpeakerFilter, selectedSlot }) => {
    return (
        <>
            <TextField
                label="Filter by Speaker"
                variant="outlined"
                size="small"
                fullWidth
                value={academicFilter}
                onChange={(e) => setSpeakerFilter(e.target.value)}
                sx={{ mb: 2 }}
            />
            {selectedSlot ? (
                <Grid container spacing={1}>
                    <Grid
                        item
                        xs={12}
                        container
                        sx={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Grid item xs={10} container>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1">
                                    {selectedSlot.StartTime.format('HH:mm')} -{' '}
                                    {selectedSlot.EndTime.format('HH:mm')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" gutterBottom>
                                    {selectedSlot.StartTime.format(
                                        'ddd, MMM DD'
                                    )}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h6">
                                {selectedSlot.AvailableAcademic.length}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {selectedSlot.AvailableAcademic.map(
                            (academic, index) => (
                                <Typography key={index}>{academic}</Typography>
                            )
                        )}
                    </Grid>
                </Grid>
            ) : (
                <Typography variant="body1">
                    Click on a time slot to view details.
                </Typography>
            )}
        </>
    )
}
