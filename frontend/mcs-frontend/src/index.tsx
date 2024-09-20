import { StyledEngineProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { loader as dashboardLoaders } from './scripts/dashboard/dashboardLoaders'
import { loader as eventLoader } from './scripts/event/eventLoader'
import { loader as eventsLoader } from './scripts/event/eventsLoader'
import { loader as financeLoader } from './scripts/finance/financeOverviewLoaders'
import { loader as speakerLoader } from './scripts/speaker/speakerLoader'
import { loader as speakersLoader } from './scripts/speaker/speakersLoader'
import { loader as tripLoader } from './scripts/trip/tripLoader'
import { loader as tripsLoader } from './scripts/trip/tripsLoader'

import { ThemeProvider } from '@emotion/react'
import { ProtectedRoute } from './components/Authentication'
import './fonts.css'
import './index.css'
import {
    BodyLayout,
    Canvassing,
    Dashboard,
    ErrorPage,
    Event,
    Events,
    Finance,
    FullWidthLayout,
    Homepage,
    Layout,
    Login,
    Logout,
    Register,
    Speaker,
    Speakers,
} from './pages'
import { Trip } from './pages/Trips/Trip'
import { Trips } from './pages/Trips/TripsOverview/Trips'
import reportWebVitals from './reportWebVitals'
import { authGuard } from './scripts/authentication/auth'
import theme from './theme/theme'
require('cors')

document.addEventListener('DOMContentLoaded', () => {
    // the createRoot function requires a root element to be present in the document so the addEventListener is used to
    // ensure that the root element is present before rendering the app
    const root = document.getElementById('root')
    if (!root) {
        throw new Error("Root element '#root' not found in the document.")
    }

    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Login />,
            errorElement: <ErrorPage />,
        },
        {
            path: '/logout',
            element: <Logout />,
            errorElement: <ErrorPage />,
        },
        {
            path: '/',
            element: <ProtectedRoute />,
            errorElement: <ErrorPage />,
            loader: authGuard,
            children: [
                {
                    path: '/',
                    element: <Layout />,
                    errorElement: <ErrorPage />,
                    children: [
                        {
                            path: '/register',
                            element: <Register />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: '/dashboard',
                            element: <BodyLayout content={<Dashboard />} />,
                            errorElement: <ErrorPage />,
                            loader: dashboardLoaders,
                        },
                        {
                            path: '/',
                            element: <Homepage />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: '/events',
                            element: <BodyLayout content={<Events />} />,
                            errorElement: <ErrorPage />,
                            loader: eventsLoader,
                        },
                        {
                            path: '/event/:id',
                            element: <Event />,
                            errorElement: <ErrorPage />,
                            loader: eventLoader,
                        },
                        {
                            path: '/speakers',
                            element: <BodyLayout content={<Speakers />} />,
                            errorElement: <ErrorPage />,
                            loader: speakersLoader,
                        },
                        {
                            path: '/speaker/:id',
                            element: <Speaker />,
                            errorElement: <ErrorPage />,
                            loader: speakerLoader,
                        },
                        {
                            path: '/trips',
                            element: <BodyLayout content={<Trips />} />,
                            errorElement: <ErrorPage />,
                            loader: tripsLoader,
                        },
                        {
                            path: '/trips/:id',
                            element: <Trip />,
                            errorElement: <ErrorPage />,
                            loader: tripLoader,
                        },
                        {
                            path: '/finance',
                            element: <BodyLayout content={<Finance />} />,
                            errorElement: <ErrorPage />,
                            loader: financeLoader,
                        },
                    ],
                },
            ],
        },
        {
            path: '/canvassing/:eventid/:academicid',
            element: <FullWidthLayout content={<Canvassing />} />,
            errorElement: <ErrorPage />,
        },
    ])

    const rootContainer = ReactDOM.createRoot(root)
    rootContainer.render(
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                {/* Material UI CSS needs to be injectFirst so that it does not override tailwind */}
                <StyledEngineProvider injectFirst>
                    <RouterProvider router={router} />
                </StyledEngineProvider>
            </ThemeProvider>
        </React.StrictMode>
    )

    reportWebVitals(console.log)
})
