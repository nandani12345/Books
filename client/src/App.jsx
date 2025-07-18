import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Login from './components/pages/login';
import Signup from './components/pages/SignUp';
import CreateBook from './components/pages/CreateBooks';
import BookList from './components/pages/BookList';
import MyBooks from './components/pages/MyBooks';
import UserBooks from './components/pages/UserBook';

function App() {
  return (
    <>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
           <Route path="/create-book" element={<CreateBook />} />
          <Route path="/booklist" element={<BookList />} />
          <Route path="/mybooks" element={<MyBooks />} />
          <Route path="/user-books" element={<UserBooks />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
