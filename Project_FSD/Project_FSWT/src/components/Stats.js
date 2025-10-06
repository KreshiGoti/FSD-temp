import React from 'react';
import './Stats.css';

const Stats = () => {
  const stats = [
    {
      icon: '🎉',
      number: '200+',
      label: 'Events Hosted',
      description: 'Amazing events created and managed'
    },
    {
      icon: '👥',
      number: '10,000+',
      label: 'Happy Attendees',
      description: 'People who love our events'
    },
    {
      icon: '⭐',
      number: '4.9/5',
      label: 'Average Rating',
      description: 'Based on attendee feedback'
    }
  ];

  return (
    <section id="about" className="stats">
      <div className="stats-container">
        <div className="stats-header">
          <h2 className="stats-title">Trusted by Event Organizers Worldwide</h2>
          <p className="stats-subtitle">Join thousands of successful event creators</p>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <span>{stat.icon}</span>
              </div>
              <div className="stat-content">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
              <div className="stat-decoration"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
