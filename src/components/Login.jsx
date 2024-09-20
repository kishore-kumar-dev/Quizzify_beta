import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('role', 'admin');
      navigate('/admin-dashboard');
      window.location.reload();
    } else if (username === 'user' && password === 'user123') {
      localStorage.setItem('role', 'user');
      navigate('/user-dashboard');
      window.location.reload();
      
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-500 to-gray-900">
  <form onSubmit={handleLogin} className="p-8 bg-white rounded-lg shadow-lg w-96">
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
    
    <div className="mb-5">
      <label className="block text-gray-600 font-semibold mb-2">Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>
    
    <div className="mb-5">
      <label className="block text-gray-600 font-semibold mb-2">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>
    
    <button type="submit" className="bg-gray-700 text-white w-full py-3 rounded-lg font-semibold hover:bg-gray-950 transition-colors duration-300">
      Login
    </button>
  </form>
</div>

  );
};

export default Login;
