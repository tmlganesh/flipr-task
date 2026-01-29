import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProjects from './pages/AdminProjects';
import AdminClients from './pages/AdminClients';
import AdminContacts from './pages/AdminContacts';
import AdminSubscribers from './pages/AdminSubscribers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="projects" element={<AdminProjects />} />
          <Route path="clients" element={<AdminClients />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="subscribers" element={<AdminSubscribers />} />
          <Route index element={<AdminProjects />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
