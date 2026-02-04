import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage'; // This must exist now

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
      </Routes>
    </Router>
  );
}

export default App;