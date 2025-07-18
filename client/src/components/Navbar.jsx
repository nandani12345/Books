// src/components/Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const styles = {
        navbar: {
            background: '#333',
            color: '#fff',
            padding: '0.8rem 1.5rem',
        },
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto',
        },
        logo: {
            fontWeight: 'bold',
            fontSize: '1.5rem',
        },
        navLinks: {
            display: 'flex',
            gap: '1.5rem',
            listStyle: 'none',
        },
        navLink: {
            color: '#fff',
            textDecoration: 'none',
            fontSize: '1rem',
        },
        activeLink: {
            color: '#ffd700',
            fontWeight: 'bold',
        },
    };

    return (
        <nav style={styles.navbar}>
            <div style={styles.container}>
                <h1 style={styles.logo}>BookSwap</h1>
                <ul style={styles.navLinks}>
                    <li>
                        <NavLink
                            to="/"
                            end
                            style={({ isActive }) =>
                                isActive ? { ...styles.navLink, ...styles.activeLink } : styles.navLink
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            style={({ isActive }) =>
                                isActive ? { ...styles.navLink, ...styles.activeLink } : styles.navLink
                            }
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/mybooks"
                            style={({ isActive }) =>
                                isActive ? { ...styles.navLink, ...styles.activeLink } : styles.navLink
                            }
                        >
                            My Books
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/user-books"
                            style={({ isActive }) =>
                                isActive ? { ...styles.navLink, ...styles.activeLink } : styles.navLink
                            }
                        >
                            UserBooks
                        </NavLink>
                    </li>
                    
                    <li>
                        <NavLink
                            to="/create-book"
                            style={({ isActive }) =>
                                isActive ? { ...styles.navLink, ...styles.activeLink } : styles.navLink
                            }
                        >
                            Create Book
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/login"
                            style={({ isActive }) =>
                                isActive ? { ...styles.navLink, ...styles.activeLink } : styles.navLink
                            }
                        >
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/signup"
                            style={({ isActive }) =>
                                isActive ? { ...styles.navLink, ...styles.activeLink } : styles.navLink
                            }
                        >
                            Signup
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
