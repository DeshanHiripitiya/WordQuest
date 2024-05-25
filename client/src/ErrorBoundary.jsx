import React, { useState, useEffect } from 'react';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  const getDerivedStateFromError = () => {
    setHasError(true);
  };

  useEffect(() => {
    const handleComponentDidCatch = (error, errorInfo) => {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
    };

    if (hasError) {
      handleComponentDidCatch();
    }
  }, [hasError]);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
}

export default ErrorBoundary;
