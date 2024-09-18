import { StyledEngineProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { loader as eventsLoader } from './scripts/event/eventsLoader'
import { loader as eventLoader } from './scripts/event/eventLoader'
import { loader as speakersLoader } from './scripts/speaker/speakersLoader'
import { loader as speakerLoader } from './scripts/speaker/speakerLoader'
import { loader as tripsLoader } from './scripts/trip/tripsLoader'
import { loader as tripLoader } from './scripts/trip/tripLoader'
import { loader as financeLoader } from './scripts/finance/financeOverviewLoaders'
import { loader as dashboardLoaders } from './scripts/dashboard/dashboardLoaders'
import { loader as venueLoader } from './scripts/venue/venuesLoader'
import { loader as canvassingLoader } from './scripts/canvassing/canvassingFormLoader'

import './index.css'
import {
    Dashboard,
    ErrorPage,
    Event,
    Finance,
    BodyLayout,
    FullWidthLayout,
    Layout,
    Login,
    Logout,
    Register,
    Events,
    Speakers,
    Speaker,
    Homepage,
    Venues,
    Canvassing,
} from './pages'
import { Trip } from './pages/Trips/Trip'
import { Trips } from './pages/Trips/TripsOverview/Trips'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider } from '@emotion/react'
import theme from './theme/theme'
import './fonts.css'
import { ProtectedRoute } from './components/Authentication'
import { authGuard } from './scripts/authentication/auth'
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
                        {
                            path: '/venues',
                            element: <BodyLayout content={<Venues />} />,
                            errorElement: <ErrorPage />,
                            loader: venueLoader,
                        },
                    ],
                },

                // Remove this from protected route later,
                // at the moment canvassing won't load if not wrapped here
                {
                    path: '/canvassing/:eventid/:academicid',
                    element: <FullWidthLayout content={<Canvassing />} />,
                    errorElement: <ErrorPage />,
                    loader: canvassingLoader,
                },
            ],
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
