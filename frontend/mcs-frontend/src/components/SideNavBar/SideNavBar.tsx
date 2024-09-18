import React, { useEffect } from 'react'
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Button,
    Grid,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import BarChartIcon from '@mui/icons-material/BarChart'
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports'
import EventIcon from '@mui/icons-material/Event'
import PeopleIcon from '@mui/icons-material/People'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import { Logo1 } from '../../assets/logo1'
import { Logo2 } from '../../assets/logo2'

interface SideNavBarProps {
    isSidebarOpen: boolean
    toggleSidebar: () => void
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
    isSidebarOpen,
    toggleSidebar,
}) => {
    const theme = useTheme()
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        if (isSmallScreen && isSidebarOpen) {
            toggleSidebar() // Automatically hide sidebar on small screens
        }
    }, [isSmallScreen, isSidebarOpen, toggleSidebar])

    const overviewTabs = [
        { name: 'Events', url: '/events' },
        { name: 'Trips', url: '/trips' },
        { name: 'Speakers', url: '/speakers' },
        { name: 'Finance', url: '/finance' },
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
        <Box
            sx={{
                display: isSidebarOpen || !isSmallScreen ? 'block' : 'none',
                backgroundColor: '#F5F5F5',
                height: '100%',
                width: isSidebarOpen || !isSmallScreen ? '192px' : '0',
                overflow: 'hidden',
            }}
        >
            <NavLink to="/dashboard">
                <Button className="bg-primary hover:bg-primary flex place-items-center w-full rounded-none">
                    <Grid
                        container
                        sx={{
                            justifyContent: 'flex-start',
                            alignItems: 'flex-end',
                        }}
                    >
                        <Grid item xs={'auto'}>
                            <Logo1 />
                        </Grid>
                        <Grid item xs={'auto'} marginBottom={1}>
                            <Logo2 />
                        </Grid>
                    </Grid>
                </Button>
            </NavLink>

            <Box className="h-full bg-primary">
                <List className="w-full bg-primary">
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
