import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, getCategories } from '../utils/api';
import { toast } from 'react-toastify';
import { FiSend } from 'react-icons/fi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './QuillEditor.css';

const NewPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isTitleTooLong, setIsTitleTooLong] = useState(false);

  const navigate = useNavigate();
  const MAX_TITLE_LENGTH = 70;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(text.length);
  }, [content]);

  useEffect(() => {
    setIsTitleTooLong(title.length > MAX_TITLE_LENGTH);
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isTitleTooLong) {
      toast.error('Title is too long. Please shorten it to 70 characters or less.');
      return;
    }
    setIsSubmitting(true);
    try {
      await createPost({ title, content, category });
      toast.success('Post created successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create post. Please try again.');
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-center mb-8">Create New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={`w-full px-3 py-2 bg-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${isTitleTooLong ? 'border-red-500' : 'border-gray-600'
                }`}
              placeholder="Enter post title"
              maxLength={MAX_TITLE_LENGTH}
            />
            <div className={`mt-1 text-sm ${isTitleTooLong ? 'text-red-500' : 'text-gray-400'}`}>
              {title.length}/{MAX_TITLE_LENGTH}
            </div>
          </div>
          <div className="mb-8">
            <label htmlFor="content" className="block text-sm font-medium mb-2">Content</label>
            <div className="bg-gray-700 rounded-lg overflow-hidden">
              <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                className="bg-gray-700 text-white quill-editor"
              />
            </div>
            <div className="mt-2 text-sm text-gray-400 text-right">
              Words: {wordCount} | Characters: {charCount}
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="w-full flex justify-center items-center bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out disabled:opacity-50 text-lg font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Post...
                </span>
              ) : (
                <span className="flex items-center">
                  <FiSend className="mr-2" />
                  Create Post
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;