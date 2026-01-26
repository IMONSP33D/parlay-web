import React, { useEffect } from 'react';
import './Verify.css';

function Verify() {
  useEffect(() => {
    // 1. Get the secret params from the URL (sent by Appwrite)
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('userId');
    const secret = params.get('secret');

    // 2. Construct the Deep Link with the params
    // This MUST match the scheme in your app.json ("scheme": "parlay-app")
    const appUrl = `parlay-app://verify?userId=${userId}&secret=${secret}`;

    // 3. Set the button link (fallback)
    const deepLinkBtn = document.getElementById('deepLinkBtn');
    if (deepLinkBtn) {
      deepLinkBtn.href = appUrl;
    }

    // 4. Attempt Auto-Redirect
    if (userId && secret) {
      window.location.href = appUrl;
    } else {
      const body = document.body;
      if (body) {
        body.innerHTML = "<h3>Error: Invalid Verification Link</h3>";
      }
    }
  }, []);

  return (
    <div className="verify-container">
      <h3>Verifying your email...</h3>
      <p>If the app doesn't open automatically, click below:</p>
      <a id="deepLinkBtn" href="#" className="btn">Open App</a>
    </div>
  );
}

export default Verify;
