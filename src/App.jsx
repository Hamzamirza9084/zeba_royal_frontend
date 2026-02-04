import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage'; 
import RegisterPage from './components/RegisterPage'
import CollegeSearch from './components/CollegeSearch';
import AdminAddUniversity from './components/AdminAddUniversity';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-deep-green dark:text-off-white overflow-x-hidden">
    <Header />
    {children}
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <MainLayout>
            <LandingPage />
          </MainLayout>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/colleges" element={<MainLayout><CollegeSearch /></MainLayout>} />
        
        {/* Admin Route */}
        <Route path="/admin" element={<AdminAddUniversity />} />
      </Routes>
    </Router>
  );
}

export default App;