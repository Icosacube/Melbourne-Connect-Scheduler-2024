import BarChartIcon from '@mui/icons-material/BarChart'
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports'
import EventIcon from '@mui/icons-material/Event'
import PeopleIcon from '@mui/icons-material/People'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Logo1 } from '../../assets/logo1'
import { Logo2 } from '../../assets/logo2'

export const SideNavBar: React.FC = () => {
    const overviewTabs = [
        {
            name: 'Events',
            url: '/events',
        },
        {
            name: 'Trips',
            url: '/trips',
        },
        {
            name: 'Speakers',
            url: '/speakers',
        },
        {
            name: 'Finance',
            url: '/finance',
        },
        { name: 'Venues', url: '/venues' },
    ]
    function overviewTabsIcons(tabName: string): JSX.Element {
        switch (tabName) {
            case 'Speakers':
                return (
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                )
            case 'Trips':
                return (
                    <ListItemIcon>
                        <ConnectingAirportsIcon />
                    </ListItemIcon>
                )
            case 'Events':
                return (
                    <ListItemIcon>
                        <EventIcon />
                    </ListItemIcon>
                )
            case 'Finance':
                return (
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                )
            case 'Venues':
                return (
                    <ListItemIcon>
                        <LocationCityIcon />
                    </ListItemIcon>
                )
            default:
                return <></>
        }
    }

    return (
        <Box className="h-screen w-full">
            <NavLink to="/dashboard">
                <Button className="bg-primary hover:bg-primary flex place-items-center w-full rounded-none">
                    <Logo1 />
                    <Logo2 />
                </Button>
            </NavLink>
            <Box className="h-full bg-primary">
                <List className="w-full bg-primary ">
                    <Typography variant="h6" fontWeight={400} className="ml-5">
                        Overview
                    </Typography>
                    {overviewTabs.map((page) => (
                        <NavLink to={page.url} key={page.name}>
                            <ListItem key={page.name} disablePadding>
                                <ListItemButton>
                                    {overviewTabsIcons(page.name)}
                                    <ListItemText
                                        primary={
                                            <Typography variant="h6">
                                                {page.name}
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                        </NavLink>
                    ))}
                </List>
            </Box>
        </Box>
    )
}
