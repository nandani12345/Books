import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', form);
      const token = res.data.token;

      // ✅ Save token in localStorage
      localStorage.setItem('token', token);

      // ✅ Save user info separately (optional)
      localStorage.setItem('user', JSON.stringify(res.data.user));

      alert('Login successful');
      navigate('/about');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // Styling
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '100px auto',
      padding: '2rem',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      backgroundColor: '#f9f9f9',
      fontFamily: 'Arial, sans-serif',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '1rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#333',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    errorText: {
      color: 'red',
      textAlign: 'center',
      marginBottom: '1rem',
    },
    linkText: {
      textAlign: 'center',
      marginTop: '1rem',
      fontSize: '0.9rem',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
      marginLeft: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      {error && <div style={styles.errorText}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p style={styles.linkText}>
        Don't have an account?
        <a href="/signup" style={styles.link}>Sign up</a>
      </p>
    </div>
  );
}

export default Login;
