import React from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-deep-green dark:text-off-white overflow-x-hidden">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;