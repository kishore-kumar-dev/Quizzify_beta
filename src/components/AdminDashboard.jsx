import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust the path as needed
import Footer from './Footer'; // Adjust the path as needed

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const storedQuizzes = JSON.parse(localStorage.getItem('userQuizzes')) || [];
    setQuizzes(storedQuizzes);
  }, []);

  const handleDeleteQuiz = (index) => {
    const updatedQuizzes = quizzes.filter((_, i) => i !== index);
    localStorage.setItem('userQuizzes', JSON.stringify(updatedQuizzes));
    setQuizzes(updatedQuizzes);
    alert('Quiz deleted!');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="space-x-4 mb-6">
          <button
            onClick={() => navigate('/create-quiz')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-800"
          >
            Create Quiz
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"> 
          {quizzes.map((quiz, index) => (
            <div key={index} className="p-4 border rounded-lg bg-white shadow max-w-xs"> 
              <h2 className="text-xl font-bold">{quiz.title}</h2>
              <p className="text-gray-600">Topic: {quiz.topic}</p>
              {/* <h3 className="font-semibold">Questions:</h3> */}
              {/* <ul className="list-disc pl-5">
                {quiz.questions.map((question, qIndex) => (
                  <li key={qIndex}>{question.question}</li>
                ))}
              </ul> */}
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => navigate('/create-quiz', { state: { quizToEdit: quiz } })} // Pass quiz data to CreateQuiz
                  className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteQuiz(index)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800"
                >
                  Delete Quiz
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
