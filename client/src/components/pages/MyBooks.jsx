import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyBooks() {
  const [books, setBooks] = useState([]);

  // Fetch all books on mount
  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/books/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching books:", err.response?.data || err.message);
      }
    };

    fetchMyBooks();
  }, []);

  
  return (
    <div style={{ padding: '20px' }}>
      <h2>My Books</h2>

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {books.map((book) => (
            <div
              key={book._id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                width: '200px',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
              }}
            >
              <img
                src={book.imageURL}
                alt={book.title}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>
                <strong>Condition:</strong> {book.condition}
              </p>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
