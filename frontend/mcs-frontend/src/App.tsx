import { Route, Routes } from 'react-router-dom';
import React from 'react';
import { Dashboard, Layout, Login, Event, Profile } from './pages';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/event' element={<Event />} />
        <Route path='/speaker' element={<Profile />} />
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
