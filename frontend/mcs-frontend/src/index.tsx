import { StyledEngineProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { loader as eventsLoader } from './scripts/event/eventsLoader';
import { loader as eventLoader } from './scripts/event/eventLoader';
import { loader as speakersLoader } from './scripts/speaker/speakersLoader';
import { loader as speakerLoader } from './scripts/speaker/speakerLoader';
import './index.css';
import {
  Dashboard,
  ErrorPage,
  Event,
  Finance,
  Layout,
  Login,
  Speakers,
  Profile,
  Trips,
} from './pages';
import { Trip } from './pages/Trips/Trip';
import reportWebVitals from './reportWebVitals';
require('cors');

document.addEventListener('DOMContentLoaded', () => {
  // the createRoot function requires a root element to be present in the document so the addEventListener is used to
  // ensure that the root element is present before rendering the app
  const root = document.getElementById('root');
  if (!root) {
    throw new Error("Root element '#root' not found in the document.");
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
          path: '/events',
          element: <Event />,
          errorElement: <ErrorPage />,
          loader: eventsLoader,
        },
        {
          path: '/events/:id',
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
        },
        {
          path: '/trips/:id',
          element: <Trip />,
          errorElement: <ErrorPage />,
        },
        {
          path: '/finance',
          element: <Finance />,
          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);
  const rootContainer = ReactDOM.createRoot(root);
  rootContainer.render(
    <React.StrictMode>
      {/* Material UI CSS needs to be injectFirst so that it does not override tailwind */}
      <StyledEngineProvider injectFirst>
        <RouterProvider router={router} />
      </StyledEngineProvider>
    </React.StrictMode>,
  );

  reportWebVitals(console.log);
});

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <StyledEngineProvider injectFirst>
//       <RouterProvider router={router} />
//     </StyledEngineProvider>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
