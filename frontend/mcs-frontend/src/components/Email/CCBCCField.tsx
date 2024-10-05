import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'
import { FormInputMultiEmail } from '../FormComponents'

interface CCBCCFieldsProps {
    control: any
    showCC: boolean
    showBCC: boolean
    onToggleCC: () => void
    onToggleBCC: () => void
}

const CCBCCFields: React.FC<CCBCCFieldsProps> = ({
    control,
    showCC,
    showBCC,
    onToggleCC,
    onToggleBCC,
}) => {
    return (
        <>
            <Box className="flex align-top justify-end">
                <IconButton size="small" onClick={onToggleCC}>
                    {showCC ? (
                        <ArrowDropDownIcon
                            fontSize="small"
                            sx={{ fontSize: '1rem' }}
                        />
                    ) : (
                        <ArrowRightIcon
                            fontSize="small"
                            sx={{ fontSize: '1rem' }}
                        />
                    )}
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '0.75rem',
                            marginLeft: '2px',
                            userSelect: 'none', // Prevent text selection
                        }}
                    >
                        Cc
                    </Typography>
                </IconButton>

                <IconButton
                    size="small"
                    onClick={onToggleBCC}
                    sx={{ padding: '2px', marginLeft: '8px' }} // Add some space between buttons
                >
                    {showBCC ? (
                        <ArrowDropDownIcon
                            fontSize="small"
                            sx={{ fontSize: '1rem' }}
                        />
                    ) : (
                        <ArrowRightIcon
                            fontSize="small"
                            sx={{ fontSize: '1rem' }}
                        />
                    )}
                    <Typography
                        variant="caption"
                        sx={{
                            fontSize: '0.75rem',
                            marginLeft: '2px',
                            userSelect: 'none',
                        }}
                    >
                        Bcc
                    </Typography>
                </IconButton>
            </Box>
            {showCC ? (
                <FormInputMultiEmail name="cc" control={control} label="Cc" />
            ) : (
                <></>
            )}
            {showBCC ? (
                <FormInputMultiEmail name="bcc" control={control} label="Bcc" />
            ) : (
                <></>
            )}
        </>
    )
}

export default CCBCCFields
