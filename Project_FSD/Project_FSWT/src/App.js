import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Events from './components/Events';
import CTA from './components/CTA';
import Footer from './components/Footer';
import EventsPage from './pages/EventsPage';
import EventDetail from './pages/EventDetail';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProfileSettings from './pages/ProfileSettings';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function Homepage() {
  return (
    <div className="App">
      <Hero />
      <Stats />
      <Events />
      <CTA />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
