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
import './index.css'
import {
    Dashboard,
    ErrorPage,
    Event,
    Finance,
    Layout,
    Login,
    Events,
    Speakers,
    Profile,
    Homepage,
} from './pages'
import { Trip } from './pages/Trips/Trip'
import { Trips } from './pages/Trips/TripsOverview/Trips'
import reportWebVitals from './reportWebVitals'
import { ThemeProvider } from '@emotion/react'
import theme from './theme/theme'
import './fonts.css'
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
            path: '/',
            element: <Layout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: '/dashboard',
                    element: <Dashboard />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: '/',
                    element: <Homepage />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: '/events',
                    element: <Events />,
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
                    path: '/login',
                    element: <Login />,
                    errorElement: <ErrorPage />,
                },
                {
                    path: '/speakers',
                    element: <Speakers />,
                    errorElement: <ErrorPage />,
                    loader: speakersLoader,
                },
                {
                    path: '/speaker/:id',
                    element: <Profile />,
                    errorElement: <ErrorPage />,
                    loader: speakerLoader,
                },
                {
                    path: '/trips',
                    element: <Trips />,
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
                    element: <Finance />,
                    errorElement: <ErrorPage />,
                    loader: financeLoader,
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
