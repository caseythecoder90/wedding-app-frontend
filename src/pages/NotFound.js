import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="font-display text-4xl text-primary mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-primary hover:bg-pink-600 text-white font-medium px-6 py-2 rounded-md shadow-md transition-colors duration-300"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;