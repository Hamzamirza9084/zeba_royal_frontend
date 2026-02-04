import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-deep-green/10 bg-off-white/80 backdrop-blur-md dark:bg-background-dark/80 dark:border-white/10">
      <div className="px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between max-w-[1440px] mx-auto">
        <div className="flex items-center gap-3 text-deep-green dark:text-primary">
          <div className="size-8 flex items-center justify-center rounded-lg bg-deep-green text-primary dark:bg-primary dark:text-deep-green">
            <span className="material-symbols-outlined text-[20px]">school</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">IELTS Prep.</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Courses</a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Resources</a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Instructors</a>
          <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Pricing</a>
        </nav>
        <div className="flex items-center gap-4">
  <Link to="/login" className="text-sm font-bold hover:text-primary transition-colors">
    Login
  </Link>
  <button className="hidden sm:flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-deep-green text-sm font-bold hover:bg-primary/90 transition-colors">
    Free Trial
  </button>
</div>
      </div>
    </header>
  );
};

export default Header;