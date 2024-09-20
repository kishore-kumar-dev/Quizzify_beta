import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust the path as needed
import Footer from './Footer'; // Adjust the path as needed

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="space-x-4">
          <button
            onClick={() => navigate('/create-quiz')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-800"
          >
            Create Quiz
          </button>
          {/* <button
            onClick={() => navigate('/quiz-app')}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-950"
          >
            Predefined Quiz
          </button> */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
