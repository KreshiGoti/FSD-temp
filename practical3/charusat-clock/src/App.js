import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>👋 Welcome to CHARUSAT!!!!</h1>
        <div className="clock">
          <p>{date.toLocaleDateString()}</p>
          <p>{date.toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
