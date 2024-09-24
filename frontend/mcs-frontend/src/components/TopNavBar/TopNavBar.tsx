import * as React from 'react'
import { useLocation } from 'react-router-dom'
import DefaultTopNavBar from './DefaultTopNavBar'

const pages = [
    {
        name: 'Dashboard',
        url: '/dashboard',
    },
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
    {
        name: 'Components',
        url: '/components',
    },
    { name: 'Event', url: '/events/:id' },
    { name: 'Trip', url: '/trips/:id' },
    { name: 'Venue', url: '/venues' },
]

export const TopNavBar: React.FC = () => {
    const curPath = useLocation().pathname
    const isTopLevelPage = curPath.split('/').length - 1 === 1
    const pageName = pages.find((page) => curPath.includes(page.url))?.name

    return (
        <>{isTopLevelPage ? <DefaultTopNavBar pageName={pageName} /> : <></>}</>
    )
}
