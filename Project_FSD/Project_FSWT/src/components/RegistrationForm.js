import React from 'react';
import './RegistrationForm.css';

const RegistrationForm = ({ event, onClose, onRegister }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    numberOfTickets: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberOfTickets' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      ...formData,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventPrice: event.price
    });
  };

  return (
    <div className="registration-modal">
      <div className="registration-content">
        <div className="registration-header">
          <h3>Register for {event?.title}</h3>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="event-details">
          <p><strong>Date:</strong> {event?.date}</p>
          <p><strong>Time:</strong> {event?.time}</p>
          <p><strong>Venue:</strong> {event?.venue}</p>
          <p><strong>Price:</strong> {event?.price === 'Free' ? 'Free' : `$${event?.price}`}</p>
        </div>

        <form onSubmit={handleSubmit} className="registration-form">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="numberOfTickets">Number of Tickets *</label>
            <input
              type="number"
              id="numberOfTickets"
              name="numberOfTickets"
              min="1"
              max="10"
              value={formData.numberOfTickets}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Register Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
