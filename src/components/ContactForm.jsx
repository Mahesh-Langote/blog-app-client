import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiMessageSquare, FiSend } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await emailjs.sendForm(
        'service_mg6toas', // Replace with your EmailJS service ID
        'template_ang6gnp', // Replace with your EmailJS template ID
        formRef.current,
        'vvJ6z4OyTlw2oPNLJ' // Replace with your EmailJS user ID
      );
      console.log('EmailJS result:', result.text);
      toast.success('Message sent successfully!');
      setFormData({ user_name: '', user_email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg"
      >
        <div>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center text-3xl font-extrabold text-white"
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-2 text-center text-sm text-gray-400"
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} ref={formRef}>
          <div className="space-y-4">
            <InputField
              icon={<FiUser />}
              type="text"
              name="user_name"
              placeholder="Your Name"
              value={formData.user_name}
              onChange={handleChange}
            />
            <InputField
              icon={<FiMail />}
              type="email"
              name="user_email"
              placeholder="Email Address"
              value={formData.user_email}
              onChange={handleChange}
            />
            <TextAreaField
              icon={<FiMessageSquare />}
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FiSend className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </div>
        </form>
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-center text-sm text-indigo-400"
            >
              Sending your message...
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-400">
            Or reach us directly at:
          </p>
          <a href="mailto:maheshlangote779@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300">
            maheshlangote779@gmail.com
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

const InputField = ({ icon, type, name, placeholder, value, onChange }) => (
  <motion.div 
    className="relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      {React.cloneElement(icon, { className: "h-5 w-5 text-gray-400" })}
    </div>
    <input
      type={type}
      name={name}
      id={name}
      required
      className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </motion.div>
);

const TextAreaField = ({ icon, name, placeholder, value, onChange }) => (
  <motion.div 
    className="relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: 0.1 }}
  >
    <div className="absolute top-3 left-3 pointer-events-none">
      {React.cloneElement(icon, { className: "h-5 w-5 text-gray-400" })}
    </div>
    <textarea
      name={name}
      id={name}
      required
      className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-700 placeholder-gray-500 text-white bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows="4"
    ></textarea>
  </motion.div>
);

export default ContactForm;