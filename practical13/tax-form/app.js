const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// GET route – show form
app.get('/', (req, res) => {
  res.render('form', { error: null });
});

// POST route – handle form submission
app.post('/calculate', (req, res) => {
  const { income1, income2 } = req.body;

  // Validation: must be numbers and not empty
  const num1 = parseFloat(income1);
  const num2 = parseFloat(income2);

  if (
    isNaN(num1) || isNaN(num2) ||
    income1.trim() === '' || income2.trim() === ''
  ) {
    return res.render('form', { error: 'Please enter valid numbers for both incomes.' });
  }

  const totalIncome = num1 + num2;
  res.render('result', { totalIncome });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
