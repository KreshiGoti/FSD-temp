import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (value === "DEL") {
      setInput(input.slice(0, -1));
    } else if (value === "AC") {          // ⬅️ All Clear logic
      setInput("");
      setResult("");
    } else if (value === "=") {
      try {
        const res = eval(input); // ⚠️ Avoid eval in production
        setResult(res);
      } catch {
        setResult("Error");
      }
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    ["AC", "DEL", "/", "*", "-", "+"], // ⬅️ Added "AC" button
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0", ".", "="],
  ];

  return (
    <div style={styles.wrapper}>
      <div style={styles.calculator}>
        <div style={styles.display}>
          <div style={styles.result}>{result && `(${result})`}</div>
          <div style={styles.input}>{input || "0"}</div>
        </div>
        {buttons.map((row, i) => (
          <div key={i} style={styles.row}>
            {row.map((btn) => (
              <button
                key={btn}
                style={{
                  ...styles.button,
                  ...(["/", "*", "+", "-", "DEL", "AC"].includes(btn) // ⬅️ Include "AC"
                    ? styles.operatorButton
                    : {}),
                  ...(btn === "=" ? styles.equalsButton : {}),
                  ...(btn === "AC" ? styles.clearAllButton : {}), // ⬅️ Style for AC
                }}
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    backgroundColor: "#f3e9dc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  calculator: {
    backdropFilter: "blur(14px)",
    background: "rgba(255, 255, 255, 0.2)", // ⬅️ 20% transparency
    padding: "25px",
    borderRadius: "20px",
    width: "320px",
    boxShadow: "0 8px 25px rgba(133, 94, 66, 0.25)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
  display: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#5e503f",
    borderRadius: "12px",
    padding: "12px 15px",
    marginBottom: "20px",
    textAlign: "right",
    backdropFilter: "blur(8px)",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  result: {
    fontSize: "14px",
    color: "#a1887f",
    marginBottom: "4px",
  },
  input: {
    fontSize: "24px",
    fontWeight: "600",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  button: {
    flex: 1,
    margin: "5px",
    padding: "15px 0",
    fontSize: "18px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // ⬅️ Button transparency
    color: "#5e503f",
    backdropFilter: "blur(10px)",
    cursor: "pointer",
    transition: "0.3s ease",
    boxShadow: "0 4px 10px rgba(133, 94, 66, 0.15)",
  },
  operatorButton: {
    color: "#7b4b35",
    fontWeight: "600",
  },
  equalsButton: {
    backgroundColor: "rgba(216, 164, 127, 0.9)",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    boxShadow: "0 0 12px rgba(216, 164, 127, 0.5)",
  },
  clearAllButton: {
    backgroundColor: "rgba(216, 164, 127, 0.9)",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    boxShadow: "0 0 12px rgba(216, 164, 127, 0.5)",
  },
};

// Add hover effect (globally)
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `button:hover {
    transform: scale(1.06);
    box-shadow: 0 0 14px rgba(133, 94, 66, 0.3);
  }`,
  styleSheet.cssRules.length
);

export default App;
