// script.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('calcForm');
  const num1El = document.getElementById('num1');
  const num2El = document.getElementById('num2');
  const errorEl = document.getElementById('error');

  form.addEventListener('submit', (e) => {
    errorEl.textContent = '';

    const n1 = num1El.value.trim();
    const n2 = num2El.value.trim();

    // client-side required check
    if (n1 === '' || n2 === '') {
      errorEl.textContent = 'Please enter both numbers.';
      e.preventDefault();
      return;
    }

    // Validate numbers (handle letters)
    // Number(...) converts strings like "12" or "12.5" -> number, otherwise NaN
    const a = Number(n1);
    const b = Number(n2);

    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      errorEl.textContent = 'Invalid input — only enter numbers (no letters).';
      e.preventDefault();
      return;
    }

    // divide-by-zero quick client check
    const op = document.getElementById('operation').value;
    if (op === 'divide' && Number(b) === 0) {
      errorEl.textContent = "Can't divide by zero.";
      e.preventDefault();
      return;
    }

    // if client-side checks pass, the form submits to server for final validation & result
  });

  // Optional: prevent pasting non-numeric characters into number fields (helps on desktop)
  [num1El, num2El].forEach(inp => {
    inp.addEventListener('input', () => {
      // allow characters: digits, ., -, +, e, E (for exponential). We'll allow default number input behavior
      // no forced filtering — server does the authoritative validation
      errorEl.textContent = '';
    });
  });
});
