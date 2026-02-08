import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Hero from './pages/Hero';
import { Explore } from './pages/Explore';
import { Operators } from './pages/Operators';
import { TripPlanner } from './pages/TripPlanner';
import { Login } from './pages/Login';
import { AuthProvider } from './state/auth';

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/operators" element={<Operators />} />
          <Route path="/trip-planner" element={<TripPlanner />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}
