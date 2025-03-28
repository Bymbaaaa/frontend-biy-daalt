import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (userData) => {
    login(userData); // Store user data in context
    navigate("/"); // Redirect to home page after login
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    const requestBody = { email, password };

    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, user } = data; // Assuming backend returns { token, user }
        localStorage.setItem('token', token); // Store token in localStorage

        // Store user details in context and localStorage
        localStorage.setItem('user', JSON.stringify(user));
        handleLogin(user); // Login user

        alert('Login successful');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto my-12 p-5 rounded-lg bg-gray-100 shadow-md">
      <h2 className="text-center mb-5">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="w-[90%] p-3 my-2 border border-gray-300 rounded text-base"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-[90%] p-3 my-2 border border-gray-300 rounded text-base"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-[90%] p-3 bg-blue-500 border-none text-white text-base rounded cursor-pointer ml-4 hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <Link to="/register">
        <div className="mt-4">Don't have an account yet? Click here to Register</div>
      </Link>
    </div>
  );
};

export default Login;
