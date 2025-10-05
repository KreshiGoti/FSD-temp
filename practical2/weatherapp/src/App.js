import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [background, setBackground] = useState('');

  const apiKey = 'eb86506d084247f592d95121253006';

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      setResult('');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );

      const temp = response.data.current.temp_c;
      const condition = response.data.current.condition.text;

      // Set background based on condition
      setWeatherBackground(condition);

      setResult(`The weather in ${city} is ${temp}°C and ${condition}`);
      setError('');
    } catch (err) {
      setResult('');
      setError("City not found or network error.");
    }
  };

  const setWeatherBackground = (condition) => {
    const lowerCaseCondition = condition.toLowerCase();

    if (lowerCaseCondition.includes("sunny") || lowerCaseCondition.includes("clear")) {
      setBackground("sunny");
    } else if (lowerCaseCondition.includes("cloud")) {
      setBackground("cloudy");
    } else if (lowerCaseCondition.includes("rain")) {
      setBackground("rainy");
    } else if (lowerCaseCondition.includes("storm") || lowerCaseCondition.includes("thunder")) {
      setBackground("storm");
    } else if (lowerCaseCondition.includes("mist") || lowerCaseCondition.includes("fog")) {
      setBackground("foggy");
    } else if (lowerCaseCondition.includes("snow") || lowerCaseCondition.includes("blizzard")) {
      setBackground("snowy");
    } else if (lowerCaseCondition.includes("wind")) {
      setBackground("windy");
    } else {
      setBackground("default");
    }
  };

  return (
    <div className={`app ${background}`}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Click here to Get Weather</button>
      {result && <p>{result}</p>}
      {error && <p style={{ color: 'white' }}>{error}</p>}
    </div>
  );
}

export default App;
