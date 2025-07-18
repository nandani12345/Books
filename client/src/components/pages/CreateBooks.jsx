import React, { useState } from 'react';

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    condition: '',
    imageURL: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You must be logged in to add a book.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/books/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Book created successfully!');
        setFormData({
          title: '',
          author: '',
          condition: '',
          imageURL: '',
        });
      } else {
        alert(`Error: ${result.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to connect to server.');
    }
  };

  // Inline styles
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f3f4f6',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '32px',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
      maxWidth: '500px',
      width: '100%',
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '24px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      marginBottom: '16px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#2563eb',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      cursor: 'pointer',
    },
    buttonHover: {
      backgroundColor: '#1d4ed8',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📘 Add a New Book</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="condition"
            placeholder="Condition (e.g., New, Like New)"
            value={formData.condition}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="imageURL"
            placeholder="Image URL"
            value={formData.imageURL}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
