import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiHome, FiPlusCircle, FiUser, FiLogIn, FiUserPlus } from 'react-icons/fi';

const Header = () => {
  const [auth, setAuth] = useState(isAuthenticated());
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = isAuthenticated();
      setAuth(isAuth);
      if (isAuth) {
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log(userData)
        setUser(userData);
      } else {
        setUser(null);
      }
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    logout();
    setAuth(false);
    setUser(null);
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-300
        ${location.pathname === to 
          ? 'bg-gray-900 text-white' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
      onClick={() => setIsMenuOpen(false)}
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </Link>
  );
// console.log(userData);
  const UserAvatar = ({ userData }) => {
    const initials = 'userData'
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
        {initials}
      </div>
    );
  };

  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">Blog App</Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink to="/" icon={FiHome}>Home</NavLink>
                {auth && <NavLink to="/new-post" icon={FiPlusCircle}>New Post</NavLink>}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {auth ? (
                <div className="relative ml-3">
                  <div>
                    <button 
                      className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      onMouseEnter={() => setIsUserMenuOpen(true)}
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                      <UserAvatar name={user?.name} />
                      <span className="ml-3 text-white">{user?.name}</span>
                    </button>
                  </div>
                  {isUserMenuOpen && (
                    <div 
                      className="origin-top-right absolute right-0 mt-0 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      onMouseEnter={() => setIsUserMenuOpen(true)}
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-4">
                  <NavLink to="/login" icon={FiLogIn}>Login</NavLink>
                  <NavLink to="/signup" icon={FiUserPlus}>Sign up</NavLink>
                </div>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink to="/" icon={FiHome}>Home</NavLink>
              {auth && <NavLink to="/new-post" icon={FiPlusCircle}>New Post</NavLink>}
              {auth ? (
                <>
                  <NavLink to="/profile" icon={FiUser}>Your Profile</NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <FiLogIn className="w-5 h-5" />
                    <span>Sign out</span>
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" icon={FiLogIn}>Login</NavLink>
                  <NavLink to="/signup" icon={FiUserPlus}>Sign up</NavLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;