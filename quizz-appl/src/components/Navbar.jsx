import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  
  const role = localStorage.getItem('role');

  const handleQuizzesClick = () => {
    role === 'admin' ? navigate('/admin-dashboard') : navigate('/user-dashboard');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
      <button className="text-2xl font-bold" onClick={handleQuizzesClick}>
          Quizzify
        </button>
        <div>
          {role === 'admin' && (
            <button
              onClick={() => navigate('/create-quiz')}
              className="px-4"
            >
              Create Quiz
            </button>
          )}
          <button
            onClick={() => navigate('/quiz-app')}
            className="px-4"
          >
            Predefined Quiz
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('role');
              navigate('/');
            }}
            className="px-4"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
