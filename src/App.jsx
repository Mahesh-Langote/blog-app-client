import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewPost from './pages/NewPost';
import Header from './components/Header';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import OtherUserProfile from './components/OtherUserProfile';
import EditPost from './components/EditPost';
import NotFound from './pages/NotFound';
import ContactForm from './components/ContactForm';
 
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  if (!isAuthenticated) {
    toast.error('Please Login');
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleClick = (event) => {
    setClickPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <Router>
      <div onClick={handleClick} style={{ minHeight: '100vh' }}>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        <Header />
        <AnimatePresence>
          <motion.div
            key={clickPosition.x + clickPosition.y}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: clickPosition.y,
              left: clickPosition.x,
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'rgba(99, 102, 241, 0.3)',
              pointerEvents: 'none',
              zIndex: 9999,
            }}
          />
        </AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route
            path="/new-post"
            element={
              <PrivateRoute>
                <NewPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/users/:id" element={<OtherUserProfile />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;