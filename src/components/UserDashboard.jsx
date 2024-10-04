import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust path as needed
import Footer from './Footer'; // Adjust path as needed

const UserDashboard = () => {
  const userQuizzes = JSON.parse(localStorage.getItem('userQuizzes')) || [];
  const navigate = useNavigate();

  const handleAttemptQuiz = (quiz) => {
    // Navigate to AttemptQuiz and pass the selected quiz data
    navigate('/attempt-quiz', { state: { quiz } });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 p-6">
        <h2 className="text-3xl font-bold mb-6">User Dashboard</h2>

        {userQuizzes.length === 0 ? (
          <p>No quizzes available.</p>
        ) : (
          userQuizzes.map((quiz, index) => (
            <div key={index} className="mb-4 p-4 bg-white shadow rounded-lg">
              <h3 className="text-xl font-bold">{quiz.title}</h3>
              <p>Topic: {quiz.topic}</p>
              <button
                onClick={() => handleAttemptQuiz(quiz)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Attempt Quiz
              </button>
            </div>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;
