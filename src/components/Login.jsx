import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(); // You can keep this to set the authentication context to true
    navigate("/"); // Redirect after login
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password');
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
        const { token } = data;
        localStorage.setItem('token', token);

        alert('Login successful');
        handleLogin(); // Proceed with setting authenticated status
        navigate("/"); // Redirect after successful login
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='register-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className='register-input'
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className='register-input'
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className='register-button'>Login</button>
      </form>
      <Link to="/register">
        <div className='linkText'>Don't have an account yet? Click here to Register</div>
      </Link>
    </div>
  );
};

export default Login;
