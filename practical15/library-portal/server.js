const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Configure session middleware FIRST
app.use(session({
  secret: 'librarySecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }
}));

// 👉 Now add logging middleware (AFTER session so req.session works)
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url} sessionID=${req.sessionID}`);

  if (req.session && req.session.user) {
    console.log(' → logged-in user:', {
      name: req.session.user.name,
      loginTime: req.session.user.loginTime
    });
  } else {
    console.log(' → logged-in user: none');
  }
  next();
});

// Configure session middleware
app.use(session({
  secret: 'librarySecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }
}));

// Serve static HTML pages
app.use(express.static('views'));

// Show login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html')); // ✅ safer than string concat
});

// Handle login
app.post('/login', (req, res) => {
  const { username } = req.body;
  if (username && username.trim() !== '') {
    req.session.user = {
      name: username,
      loginTime: new Date().toLocaleString()
    };
    res.redirect('/profile');
  } else {
    res.send('Please enter a valid name.');
  }
});

// Profile page (protected route)
app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.send(`
      <h1>Welcome, ${req.session.user.name}</h1>
      <p>Login Time: ${req.session.user.loginTime}</p>
      <a href="/logout">Logout</a>
    `);
  } else {
    res.redirect('/login');
  }
});

// Logout route
// Logout route
app.get('/logout', (req, res) => {
  if (req.session && req.session.user) {
    const logoutTime = new Date().toLocaleString();

    console.log('🚪 User logging out:', {
      name: req.session.user.name,
      loginTime: req.session.user.loginTime,
      logoutTime: logoutTime,
      sessionID: req.sessionID
    });
  } else {
    console.log('🚪 Logout attempt with no active user, sessionID:', req.sessionID);
  }

  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.send('Error logging out.');
    }
    res.redirect('/login');
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html')); // ✅ fixed with path.join
});

// Start the server
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
