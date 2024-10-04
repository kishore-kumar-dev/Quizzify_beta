import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Login from './components/Login';
import CreateQuiz from './components/CreateQuiz';
import QuizApp from './QuizApp';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Unauthorized from './components/Unauthorized'; // A page for unauthorized access.
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import AttemptQuiz from './components/AttemptQuiz';

const App = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Check local storage for user role
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {role === 'admin' && <Route path="/admin-dashboard" element={<AdminDashboard />} />}
        {role === 'user' && <Route path="/user-dashboard" element={<UserDashboard />} />}
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/attempt-quiz" element={<AttemptQuiz />} />
        <Route path="/quiz-app" element={<QuizApp />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
};

export default App;