import React, { useEffect, useState } from 'react';

export default function BookList({ search = '' }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/api/books/${search ? `?search=${search}` : ''}`);
        if (!res.ok) throw new Error('Failed to fetch books');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [search]);

  // 🔥 Delete function
  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token'); // assuming you're storing JWT in localStorage

      const res = await fetch(`http://localhost:5000/api/books/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to delete book');
      }

      // Remove book from UI
      setBooks(books.filter(book => book._id !== bookId));

      alert('Book deleted successfully');
    } catch (err) {
      console.error('Error deleting book:', err);
      alert(err.message || 'Could not delete the book');
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>
        Loading books...
      </p>
    );

  if (error)
    return (
      <p style={{ textAlign: 'center', color: 'red', fontSize: '16px' }}>
        Error: {error}
      </p>
    );

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '20px',
        padding: '20px',
      }}
    >
      {books.length === 0 ? (
        <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '18px' }}>
          No books found
        </p>
      ) : (
        books.map((book) => (
          <div
            key={book._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{book.title}</h3>
            <p style={{ margin: '6px 0' }}>
              <strong>Author:</strong> {book.author}
            </p>
            <p style={{ margin: '6px 0' }}>
              <strong>Condition:</strong> {book.condition}
            </p>
            {book.imageURL && (
              <img
                src={book.imageURL}
                alt={book.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  margin: '12px 0',
                }}
              />
            )}
            <p style={{ margin: '6px 0' }}>
              <strong>Owner:</strong> {book.user?.name || 'Unknown'}
            </p>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(book._id)}
              style={{
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}