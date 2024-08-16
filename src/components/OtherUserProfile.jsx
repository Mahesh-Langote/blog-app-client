import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API } from '../utils/api';
import { toast } from 'react-toastify';
import { FiUser, FiEdit, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const OtherUserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get(`/users/${id}`);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load user profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-t-4 border-indigo-500 border-solid rounded-full"
        />
      </div>
    );
  }

  if (!profile) return <div className="text-center py-10 text-white bg-gray-900">Failed to load user profile</div>;

  return (
    <div className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center mb-6">
              <div className="w-32 h-32 bg-indigo-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 md:mb-0 md:mr-6">
                {profile.user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">{profile.user.name}</h2>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FiEdit className="mr-2 text-indigo-400" /> Posts
              </h3>
              {profile.posts.length > 0 ? (
                <ul className="space-y-3">
                  {profile.posts.map(post => (
                    <motion.li
                      key={post._id}
                      className="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <Link to={`/posts/${post._id}`} className="text-indigo-300 hover:text-indigo-200 text-lg font-medium">
                        {post.title}
                      </Link>
                      <div className="flex items-center mt-2 text-sm text-gray-400">
                        <FiClock className="mr-1" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 italic">This user hasn't written any posts yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherUserProfile;