import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import {
  Components,
  Dashboard,
  ErrorPage,
  Event,
  Finance,
  Layout,
  Login,
  People,
  Trips
} from './pages';
import Events from './pages/Event/Events';
import Profile from './pages/People/Profile';
import Trip from './pages/Trips/Trip';
import reportWebVitals from './reportWebVitals';
require('cors');

// Material UI CSS needs to be injectFirst so that it does not override tailwind

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
        errorElement: <ErrorPage />
      },
      {
        path: '/events',
        element: <Events />,
        errorElement: <ErrorPage />
      },
      {
        path: '/events/:id',
        element: <Event />,
        errorElement: <ErrorPage />
      },
      {
        path: '/login',
        element: <Login />,
        errorElement: <ErrorPage />
      },
      {
        path: '/people',
        element: <People />,
        errorElement: <ErrorPage />
      },
      {
        path: '/people/:id',
        element: <Profile />,
        errorElement: <ErrorPage />
      },
      {
        path: '/components',
        element: <Components />,
        errorElement: <ErrorPage />
      },
      {
        path: '/trips',
        element: <Trips />,
        errorElement: <ErrorPage />
      },
      {
        path: '/trips/:id',
        element: <Trip />,
        errorElement: <ErrorPage />
      },
      {
        path: '/finance',
        element: <Finance />,
        errorElement: <ErrorPage />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <RouterProvider router={router} />
    </StyledEngineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
