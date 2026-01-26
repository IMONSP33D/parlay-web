import React, { useEffect, useState } from 'react';
import './Verify.css';

function Verify() {
  const [appUrl, setAppUrl] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // 1. Get the secret params from the URL (sent by Appwrite)
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const secret = params.get('secret');

    // 2. Construct the Deep Link with the params
    // This MUST match the scheme in your app.json ("scheme": "parlay-app")
    const deepLink = `parlay-app://verify?userId=${userId}&secret=${secret}`;
    setAppUrl(deepLink);

    // 3. Attempt Auto-Redirect
    if (userId && secret) {
      window.location.href = deepLink;
    } else {
      setError(true);
    }
  }, []);

  if (error) {
    return (
      <div className="verify-container">
        <h3>Error: Invalid Verification Link</h3>
      </div>
    );
  }

  return (
    <div className="verify-container">
      <h3>Verifying your email...</h3>
      <p>If the app doesn't open automatically, click below:</p>
      <a href={appUrl} className="btn">Open App</a>
    </div>
  );
}

export default Verify;
