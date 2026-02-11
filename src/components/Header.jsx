import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Used to trigger updates on route change
  const [user, setUser] = useState(null);

  // Check for user in localStorage whenever the route changes
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear data
    setUser(null); // Clear state
    navigate('/login'); // Redirect
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-deep-green/10 bg-off-white/80 backdrop-blur-md dark:bg-background-dark/80 dark:border-white/10">
      <div className="px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between max-w-[1440px] mx-auto">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 text-deep-green dark:text-primary group">
  {/* Replaced the original div and icon with this img tag */}
  <img
    src="../../public/Images/svglogo.svg"
    alt="Anvora Logo"
    className="size-13 object-contain group-hover:scale-110 transition-transform"
  />

  <h2 className="text-xl font-bold tracking-tight">Anvora</h2>
</Link>
        {/* Navigation - Main "Finder" Link */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/colleges" 
            className="flex items-center gap-2 text-sm font-extrabold text-deep-green hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            University Finder
          </Link>
          <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">Guides</Link>
        </nav>

        {/* Action Buttons: Conditional Rendering */}
        <div className="flex items-center gap-4">
          {user ? (
            /* User is Logged In */
            <div className="flex items-center gap-4">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-deep-green leading-none">{user.name}</p>
                  <p className="text-xs text-deep-green/60 mt-0.5">{user.email}</p>
               </div>
               <Link 
                to="/profile/upload" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Auto-Fill Profile
              </Link>
               <button 
                 onClick={handleLogout}
                 className="flex items-center justify-center size-10 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 transition-all"
                 title="Logout"
               >
                 <span className="material-symbols-outlined text-[20px]">logout</span>
               </button>
            </div>
          ) : (
            /* User is Logged Out */
            <>
              <Link 
                to="/login" 
                className="text-sm font-bold text-deep-green hover:text-primary transition-colors"
              >
                Login
              </Link>
              
              <Link 
                to="/register" 
                className="hidden sm:flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-deep-green text-sm font-bold border border-deep-green shadow-[3px_3px_0px_0px_rgba(52,121,40,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(52,121,40,1)] transition-all"
              >
                Register Now
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;