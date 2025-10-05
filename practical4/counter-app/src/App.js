import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  const incrementFive = () => setCount(count + 5);

  return (
    <div className="app-container">
      <div className="content-box">
        <h1>Count: {count}</h1>
        <div className="button-container">
          <button onClick={reset}>Reset</button>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
          <button onClick={incrementFive}>Increment 5</button>
        </div>
        <h2>Welcome to CHARUSAT!!!</h2>
        <div className="input-group">
          <label>
            First Name:{" "}
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Last Name:{" "}
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div className="name-display">
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
