// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container text-center mt-5">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <p className="lead">Oops! The page you are looking for doesn't exist.</p>
            <p className="mb-4">It might have been moved or deleted.</p>
            <Link to="/" className="btn btn-primary">
                Go Back to Home
            </Link>
        </div>
    );
};

export default NotFound;
