import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Events from '../components/Events';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const UserDashboard = () => {
  return (
		<div className="App">
			<Hero />
			<Stats />
			<Events />
			<CTA />
			<Footer />
    </div>
  );
};

export default UserDashboard;
