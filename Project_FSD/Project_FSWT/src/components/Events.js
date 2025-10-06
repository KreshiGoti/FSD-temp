import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Events.css';

const Events = () => {
  const navigate = useNavigate();

  const handleViewAllEvents = () => {
    navigate('/events');
  };

  const events = [
    {
      id: 1,
      title: "Tech Innovation Summit 2024",
      description: "Join industry leaders for groundbreaking discussions on the future of technology and innovation.",
      date: "March 15, 2024",
      time: "9:00 AM - 5:00 PM",
      venue: "Convention Center",
      seats: "150 seats left",
      category: "Technology",
      price: "Free",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Digital Marketing Workshop",
      description: "Learn the latest strategies and tools to boost your digital marketing campaigns.",
      date: "March 20, 2024",
      time: "10:00 AM - 4:00 PM",
      venue: "Business Center",
      seats: "75 seats left",
      category: "Business",
      price: "$99",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Music & Arts Festival",
      description: "Experience a weekend filled with live music, art exhibitions, and creative workshops.",
      date: "March 25, 2024",
      time: "12:00 PM - 10:00 PM",
      venue: "City Park",
      seats: "500 seats left",
      category: "Entertainment",
      price: "$45",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop"
    }
  ];

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'technology':
        return '#667eea';
      case 'business':
        return '#f093fb';
      case 'entertainment':
        return '#4facfe';
      default:
        return '#667eea';
    }
  };

  return (
    <section className="events" id="events">
      <div className="events-container">
        <div className="events-header">
          <h2 className="events-title">Upcoming Featured Events</h2>
          <p className="events-subtitle">Don't miss out on these amazing experiences</p>
        </div>
        
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <div 
                  className="event-category"
                  style={{ backgroundColor: getCategoryColor(event.category) }}
                >
                  {event.category}
                </div>
                <div className="event-price">{event.price}</div>
              </div>
              
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                
                <div className="event-details">
                  <div className="event-detail">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>{event.date}</span>
                  </div>
                  <div className="event-detail">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                    <span>{event.time}</span>
                  </div>
                  <div className="event-detail">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{event.venue}</span>
                  </div>
                </div>
                
                <div className="event-footer">
                  <div className="event-seats">{event.seats}</div>
                  <button className="event-button">
                    Learn More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="events-footer">
          <button className="btn btn-primary" onClick={handleViewAllEvents}>
            <span>View All Events</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
      
    </section>
  );
};

export default Events;
