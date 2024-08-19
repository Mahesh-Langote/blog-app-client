import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

// Custom PrivateRoute component
const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  if (!isAuthenticated) {
    toast.error('Please Login');
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/posts/:id"
          element={

            <PostDetail />

          }
        />
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
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;