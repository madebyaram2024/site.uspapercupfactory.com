'use client';

import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setShowBanner(true);
        } else {
            // Re-trigger consent state on load based on saved preference
            updateGtag(consent as 'granted' | 'denied');
        }
    }, []);

    const updateGtag = (status: 'granted' | 'denied') => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('consent', 'update', {
                'ad_storage': status,
                'ad_user_data': status,
                'ad_ads_personalization': status,
                'analytics_storage': status,
            });
        }
    };

    const handleConsent = (status: 'granted' | 'denied') => {
        localStorage.setItem('cookieConsent', status);
        updateGtag(status);
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="cookie-banner">
            <div className="cookie-content">
                <div className="cookie-text">
                    <h3>Your Privacy, Designed with Care</h3>
                    <p>
                        We use cookies to enhance your experience and analyze our traffic.
                        By clicking "Accept All", you consent to our use of cookies.
                    </p>
                </div>
                <div className="cookie-actions">
                    <button onClick={() => handleConsent('denied')} className="btn-decline">
                        Decline
                    </button>
                    <button onClick={() => handleConsent('granted')} className="btn-accept">
                        Accept All
                    </button>
                </div>
            </div>
            <style jsx>{`
        .cookie-banner {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 800px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 24px;
          padding: 1.5rem 2rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          z-index: 9999;
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from { transform: translate(-50%, 100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        .cookie-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .cookie-text h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.15rem;
          font-weight: 600;
          color: #1a1a1a;
        }

        .cookie-text p {
          margin: 0;
          font-size: 0.9rem;
          color: #666;
          line-height: 1.4;
        }

        .cookie-actions {
          display: flex;
          gap: 0.75rem;
          flex-shrink: 0;
        }

        button {
          padding: 0.65rem 1.25rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .btn-decline {
          background: transparent;
          color: #666;
          border: 1px solid #ddd;
        }

        .btn-decline:hover {
          background: rgba(0, 0, 0, 0.05);
          border-color: #ccc;
        }

        .btn-accept {
          background: #1a1a1a;
          color: white;
        }

        .btn-accept:hover {
          background: #333;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .cookie-banner {
            bottom: 1rem;
            padding: 1.5rem;
          }
          .cookie-content {
            flex-direction: column;
            text-align: center;
            gap: 1.25rem;
          }
          .cookie-actions {
            width: 100%;
          }
          .cookie-actions button {
            flex: 1;
            padding: 0.75rem;
          }
        }
      `}</style>
        </div>
    );
};

export default CookieConsent;
