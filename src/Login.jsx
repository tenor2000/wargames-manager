import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
// import { auth } from './firebase';
import './styles/Login.css';
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className='login-view'>
      {error && <div>{error}</div>}
      <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='login TextField'/>
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='login TextField'/>
      <button onClick={handleLogin}>Login</button>
    </form>
  );
}

export function LoginSideBar() {
  return (
    <div>
      <h2>Login</h2>
    </div>
  );
}
