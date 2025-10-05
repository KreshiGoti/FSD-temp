// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: parse form data & JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static assets from /public
app.use(express.static(path.join(__dirname, 'public')));

// POST endpoint to compute result
app.post('/calculate', (req, res) => {
  let { num1, num2, operation } = req.body;

  // normalize & trim inputs
  num1 = (typeof num1 === 'string') ? num1.trim() : num1;
  num2 = (typeof num2 === 'string') ? num2.trim() : num2;

  const a = parseFloat(num1);
  const b = parseFloat(num2);

  // Server-side validation for invalid numbers
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return res.status(400).send(renderResultPage('❌ Invalid input. Please enter valid numbers (no letters).', true));
  }

  let result;
  switch (operation) {
    case 'add':
      result = a + b;
      break;
    case 'subtract':
      result = a - b;
      break;
    case 'multiply':
      result = a * b;
      break;
    case 'divide':
      if (b === 0) return res.status(400).send(renderResultPage('⚠️ Cannot divide by zero.', true));
      result = a / b;
      break;
    default:
      return res.status(400).send(renderResultPage('⚠️ Unknown operation.', true));
  }

  // Format result (limit long decimals)
  const pretty = Number.isFinite(result) ? (Math.round(result * 1000000) / 1000000) : result;

  return res.send(renderResultPage(`✅ Result: <strong>${pretty}</strong>`));
});

function renderResultPage(message, isError = false) {
  return `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Calculator Result</title>
    <style>
      body{font-family:Arial,Helvetica,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;background:#f6fbff;margin:0;padding:20px}
      .card{background:white;padding:24px;border-radius:12px;box-shadow:0 8px 20px rgba(30,40,60,0.08);max-width:420px;width:100%;text-align:center}
      .error{color:#c0392b}
      a{display:inline-block;margin-top:16px;padding:10px 16px;border-radius:8px;text-decoration:none;background:#4a90e2;color:white}
    </style>
  </head>
  <body>
    <div class="card">
      <div class="${isError ? 'error' : ''}" style="font-size:1.25rem">${message}</div>
      <a href="/">🔄 Do another calculation</a>
    </div>
  </body>
  </html>
  `;
}

app.listen(PORT, () => {
  console.log(`Calculator app running: http://localhost:${PORT}`);
});
