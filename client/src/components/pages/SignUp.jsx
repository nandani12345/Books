import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/signup', form);

            // ✅ Store token and user info
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            alert('Signup successful');
            navigate('/login');
        } catch (err) {
            alert(err.response?.data?.message || 'Signup failed');
        }
    };

    // ✅ Inline styles
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
        text: {
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
            <h2 style={styles.heading}>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
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
                <button type="submit" style={styles.button}>Signup</button>
            </form>
            <p style={styles.text}>
                Already have an account?
                <a href="/login" style={styles.link}>Login</a>
            </p>
        </div>
    );
}

export default Signup;
