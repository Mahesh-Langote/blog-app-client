import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/api';
import { toast } from 'react-toastify';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await loginUser(formData.email, formData.password);
  //     if (response && response.token) {
  //       localStorage.setItem('token', response.token);
  //       toast.success('Login successful!');
  //       navigate('/');
  //     } else {
  //       throw new Error('No token received');
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     toast.error(error.message || 'Login failed. Please check your credentials.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData.email, formData.password);
      if (response && response.token) {
        toast.success('Login successful!');
        window.dispatchEvent(new Event('storage')); // Trigger storage event
        navigate('/');
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please check your credentials.');
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-white">
            Log in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField
              icon={<FiMail />}
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
            />
            <PasswordField
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              showPassword={showPassword}
              toggleVisibility={togglePasswordVisibility}
            />
          </div>

          <div>
            <motion.button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Log in
            </motion.button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-indigo-400 hover:text-indigo-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

const InputField = ({ icon, type, name, placeholder, value, onChange }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {React.cloneElement(icon, { className: "h-5 w-5 text-gray-400" })}
    </div>
    <input
      type={type}
      name={name}
      id={name}
      autoComplete={name}
      required
      className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
);

const PasswordField = ({ name, placeholder, value, onChange, showPassword, toggleVisibility }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiLock className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type={showPassword ? "text" : "password"}
      name={name}
      id={name}
      autoComplete="current-password"
      required
      className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 pr-10 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <button
      type="button"
      className="absolute inset-y-0 right-0 pr-3 flex items-center"
      onClick={toggleVisibility}
    >
      {showPassword ? (
        <FiEyeOff className="h-5 w-5 text-gray-400" />
      ) : (
        <FiEye className="h-5 w-5 text-gray-400" />
      )}
    </button>
  </div>
);

export default Login;