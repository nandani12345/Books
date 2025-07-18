import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all, today, yesterday

  const token = localStorage.getItem('token');

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/mybooks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
      applyDateFilter(response.data, filter);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to load your books.');
    }
  };

  // Helper: Format date to YYYY-MM-DD
  const formatDate = (date) => new Date(date).toISOString().split('T')[0];

  // Apply date filter
  const applyDateFilter = (booksList, selectedFilter) => {
    const today = formatDate(new Date());
    const yesterday = formatDate(new Date(Date.now() - 86400000)); // 1 day = 86400000 ms

    const filtered = booksList.filter((book) => {
      const bookDate = formatDate(book.createdAt);
      if (selectedFilter === 'today') return bookDate === today;
      if (selectedFilter === 'yesterday') return bookDate === yesterday;
      return true; // 'all'
    });

    setFilteredBooks(filtered);
  };

  const handleFilterChange = (e) => {
    const selected = e.target.value;
    setFilter(selected);
    applyDateFilter(books, selected);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedBooks = books.filter(book => book._id !== id);
      setBooks(updatedBooks);
      applyDateFilter(updatedBooks, filter);
    } catch (err) {
      console.error('Error deleting book:', err);
      setError('Failed to delete the book. Please try again.');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>My Books</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Filter Dropdown */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Filter by Date:</label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
        </select>
      </div>

      {filteredBooks.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No books found for this filter.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {filteredBooks.map(book => (
            <div
              key={book._id}
              style={{
                width: '220px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                textAlign: 'center',
              }}
            >
              <img
                src={book.imageURL}
                alt={book.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }}
              />
              <h4 style={{ margin: '10px 0' }}>{book.title}</h4>
              <p style={{ margin: 0, color: '#555' }}>by {book.author}</p>
              <p style={{ margin: '5px 0', color: '#888' }}>Condition: {book.condition}</p>
              <p style={{ fontSize: '12px', color: '#aaa' }}>
                Added on: {new Date(book.createdAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => handleDelete(book._id)}
                style={{
                  marginTop: '10px',
                  backgroundColor: '#ff4d4f',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
