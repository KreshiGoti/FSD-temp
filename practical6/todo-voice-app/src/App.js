import React, { useState } from "react";
import "./App.css";

function App() {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [input, setInput] = useState("");

  // Add new task
  const addTask = () => {
    if (input.trim() !== "") {
      setPendingTasks([...pendingTasks, input]);
      setInput("");
    }
  };

  // Delete task
  const deleteTask = (index, isCompleted = false) => {
    if (isCompleted) {
      const updatedCompleted = [...completedTasks];
      updatedCompleted.splice(index, 1);
      setCompletedTasks(updatedCompleted);
    } else {
      const updatedPending = [...pendingTasks];
      updatedPending.splice(index, 1);
      setPendingTasks(updatedPending);
    }
  };

  // Mark task as completed
  const completeTask = (index) => {
    const taskToComplete = pendingTasks[index];
    setCompletedTasks([...completedTasks, taskToComplete]);

    const updatedPending = [...pendingTasks];
    updatedPending.splice(index, 1);
    setPendingTasks(updatedPending);
  };

  // Start voice recognition
  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setInput(speechResult);
    };
  };

  return (
    <div className="container">
      <h1>Get Things Done!</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="What is the task today?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="add-btn" onClick={addTask}>Add Task</button>
        <button className="mic-btn" onClick={startListening}>🎤</button>
      </div>

      <div className="task-section">
        <h2>Pending Tasks</h2>
        <div className="task-list">
          {pendingTasks.map((task, index) => (
            <div key={index} className="task">
              <span>{task}</span>
              <div className="actions">
                <button className="complete-btn" onClick={() => completeTask(index)}>✔</button>
                <button className="delete-btn" onClick={() => deleteTask(index, false)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="task-section">
        <h2>Completed Tasks</h2>
        <div className="task-list">
          {completedTasks.map((task, index) => (
            <div key={index} className="task completed">
              <span>{task}</span>
              <div className="actions">
                <button className="delete-btn" onClick={() => deleteTask(index, true)}>🗑</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
