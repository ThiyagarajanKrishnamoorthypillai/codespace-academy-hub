import React, { createContext, useState, useContext, useEffect } from 'react';
import { registerLoaderHandler } from '../utils/loaderControl'; // 👈 register loader globally

const LoadingContext = createContext();
export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    registerLoaderHandler(setLoading); // 👈 make loader globally callable
  }, []);

  return (
    <LoadingContext.Provider value={{ loading }}>
      {children}

      {loading && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 9999,
            backdropFilter: 'blur(2px)'
          }}
        >
          <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 fw-semibold text-dark">Please wait…</p>
        </div>
      )}
    </LoadingContext.Provider>
  );
};
