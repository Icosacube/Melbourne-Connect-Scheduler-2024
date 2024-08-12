import React from 'react'
import { NavLink } from 'react-router-dom'
import { Logo1 } from '../../assets/logo1'
import { Logo2 } from '../../assets/logo2'
import {
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports'
import EventIcon from '@mui/icons-material/Event'
import PeopleIcon from '@mui/icons-material/People'

export const SideNavBar: React.FC = () => {
    // const eventTabs = ['About', 'Participant', 'Programme', 'Services']
    // const canvassingTabs = ['Availability', 'Booking']
    // const tripTabs = ['Schedule', 'Travel', 'Accomodation', 'Costs']
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
            default:
                return <></>
        }
    }

    return (
        <>
            <Box className="h-full w-full">
                <NavLink to="/dashboard">
                    <Button className="bg-primary hover:bg-primary flex place-items-center w-full rounded-none">
                        <Logo1 />
                        <Logo2 />
                    </Button>
                </NavLink>
                <Box className="h-full bg-primary">
                    <List className="w-full bg-primary ">
                        <Typography variant="h6" className="ml-4">
                            Overview
                        </Typography>
                        {overviewTabs.map((page) => (
                            <NavLink to={page.url} key={page.name}>
                                <ListItem key={page.name} disablePadding>
                                    <ListItemButton>
                                        {overviewTabsIcons(page.name)}
                                        <ListItemText primary={page.name} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                        ))}
                    </List>
                    {/* <Divider className="bg-[#FBE418]" /> */}
                </Box>
                {/* <Box className="bg-[#FFC901] grow">
                    <List>
                        <Typography variant="h6" className="ml-3">
                            Event
                        </Typography>
                        {eventTabs.map((text) => (
                            <ListItem
                                key={text}
                                disablePadding
                                className="pl-3"
                            >
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <List>
                        <Typography variant="h6" className="ml-3">
                            Canvassing
                        </Typography>
                        {canvassingTabs.map((text) => (
                            <ListItem
                                key={text}
                                disablePadding
                                className="pl-3"
                            >
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <List>
                        <Typography variant="h6" className="ml-3">
                            Trip
                        </Typography>
                        {tripTabs.map((text) => (
                            <ListItem
                                key={text}
                                disablePadding
                                className="pl-3"
                            >
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box> */}
            </Box>
        </>
    )
}
