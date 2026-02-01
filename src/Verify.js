import React, { useEffect, useState } from 'react';

function Verify() {
  const [message, setMessage] = useState('Opening Parlay...');
  const [error, setError] = useState(false);
  const [deepLink, setDeepLink] = useState('');

  useEffect(() => {
    // 1. Get parameters from the URL (sent by Appwrite)
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const secret = params.get('secret');

    // 2. Construct your deep link
    const link = `parlayapp://RegisterVerification?userId=${userId}&secret=${secret}`;
    setDeepLink(link);

    // 3. Redirect immediately
    if (userId && secret) {
      window.location.href = link;
      
      // Fallback message after 3 seconds if app doesn't open
      setTimeout(() => {
        setMessage('If Parlay didn\'t open automatically, click the button below.');
      }, 3000);
    } else {
      setError(true);
    }
  }, []);

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      margin: 0,
      background: '#f5f5f5'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '400px'
      }}>
        {!error && (
          <div style={{
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            margin: '1rem auto'
          }} />
        )}
        <p style={{ color: error ? '#e74c3c' : 'inherit' }}>
          {error ? 'Error: Invalid verification link. Please check your email and try again.' : message}
        </p>
        {!error && deepLink && (
          <a href={deepLink} style={{
            display: 'inline-block',
            marginTop: '1rem',
            color: '#3498db',
            textDecoration: 'none',
            padding: '0.75rem 1.5rem',
            background: '#f0f0f0',
            borderRadius: '8px',
            transition: 'background 0.3s ease'
          }}>
            Open Parlay Manually
          </a>
        )}
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Verify;
