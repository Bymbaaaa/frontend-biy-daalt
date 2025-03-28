import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requestBody = { name, email, password };

    try {
      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful');
        window.location.href = '/login'; 
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto my-12 p-5 rounded-lg bg-gray-100 shadow-md"> 
      <h2 className="text-center mb-5">Register</h2>
      <form onSubmit={handleSubmit}>
        <input className="w-[90%] p-3 my-2 border border-gray-300 rounded text-base" 
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /> <br />
        <input className="w-[90%] p-3 my-2 border border-gray-300 rounded text-base" 
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> <br />
        <input className="w-[90%] p-3 my-2 border border-gray-300 rounded text-base" 
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> <br />
        <button type="submit" className="w-[90%] p-3 bg-blue-500 border-none text-white text-base rounded cursor-pointer ml-4 hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
};

export default Register;