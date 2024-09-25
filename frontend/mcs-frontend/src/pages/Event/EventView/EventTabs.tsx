import { Tabs, Menu, MenuItem } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import React, { FC, useState } from 'react'

interface EventTabsProps {
    getTabName: (tabName: string) => void
}

export const EventTabs: FC<EventTabsProps> = ({ getTabName }) => {
    const [value, setValue] = useState('About')
    const [anchorEl, setAnchorEl] = useState<any>(null)

    const handleChange = (_event: any, newValue: string) => {
        if (newValue !== 'Services') {
            setValue(newValue)
            getTabName(newValue)
        }
    }

    const handleMenuItemClick = (option: string) => {
        setValue('Services')
        setAnchorEl(null)
        getTabName(option)
    }

    const handleMouseEnter = (event: any) => {
        if (event.currentTarget.id === 'services-tab') {
            setAnchorEl(event.currentTarget)
        }
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    // return (
    //     <Box sx={{ width: '100%' }}>
    //         <Tabs value={value} onChange={handleChange} aria-label="event tabs">
    //             <Tab label="About" value="About" />
    //             <Tab label="Participants" value="Participants" />
    //             <Tab label="Canvassing" value="Canvassing" />
    //             <Tab label="Programme" value="Programme" />
    //             <Tab label="Services" value="Services" />
    //         </Tabs>
    //     </Box>
    // )

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} aria-label="event tabs">
                <Tab label="About" value="About" />
                <Tab label="Participants" value="Participants" />
                <Tab label="Canvassing" value="Canvassing" />
                <Tab label="Programme" value="Programme" />
                <Tab
                    label="Services"
                    value="Services"
                    aria-controls="services-menu"
                    aria-haspopup="true"
                    id="services-tab"
                    onMouseEnter={handleMouseEnter}
                />
            </Tabs>
            <Menu
                id="services-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted
            >
                <MenuItem onClick={() => handleMenuItemClick('Catering')}>
                    Catering
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick('Room Services')}>
                    Room Services
                </MenuItem>
            </Menu>
        </Box>
    )
}
