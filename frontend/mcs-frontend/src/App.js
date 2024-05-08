import { Route, Routes } from "react-router-dom";
import React from "react";
import { Dashboard, Layout, Login, Event, Speaker, Components } from "./pages/";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event" element={<Event />} />
        <Route path="/speaker" element={<Speaker />} />
        <Route path="/login" element={<Login />} />
        <Route path="/components" element={<Components />} />
      </Route>
    </Routes>
  );
}

export default App;
