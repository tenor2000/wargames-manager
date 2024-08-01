import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import '../styles/Login.css';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('')
    try {
      const response = await fetch(`${import.meta.env.VITE_API_DATA_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        console.log("Log in Successful")
        // Handle successful login (e.g., redirect or store token)
      } else {
        // Handle login failure
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className='login-view' onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='login TextField'/>
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='login TextField'/>
      <Button type="submit">Log In</Button>
    </form>
  );
}

export function LoginSideDrawer() {
  return (
    <div>
      <h2>Login</h2>
    </div>
  );
}
