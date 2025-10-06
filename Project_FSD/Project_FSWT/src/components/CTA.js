import React from 'react';
import './CTA.css';

const CTA = () => {
  return (
    <section className="cta">
      <div className="cta-background">
        <div className="cta-overlay"></div>
        <div className="cta-pattern"></div>
      </div>
      
      <div className="cta-content">
        <div className="cta-container">
          <div className="cta-text">
            <h2 className="cta-title">
              Ready to Start Your 
              <span className="highlight">Event Journey?</span>
            </h2>
            <p className="cta-subtitle">
              Join thousands of event enthusiasts and discover experiences that will inspire and connect you with like-minded people.
            </p>
            
            <div className="cta-buttons">
              <button className="btn btn-white">
                <span>Get Started Today</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button className="btn btn-outline">
                <span>Learn More</span>
              </button>
            </div>
            
            <div className="cta-features">
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Free to join</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>No hidden fees</span>
              </div>
              <div className="feature-item">
                <div className="feature-icon">✓</div>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
