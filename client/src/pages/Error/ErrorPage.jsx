import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css'; // استيراد ملف CSS المخصص

const ErrorPage = () => {
  return (
    <div className="error-page-container">
      <div className="error-page-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Oops! Page Not Found</h2>
        <p className="error-message">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link to="/" className="error-link">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
