// Vote counts object
let votes = {
  JavaScript: 34,
  Python: 35,
  Java: 40
};

// Update vote counts in the UI
function updateVotes() {
  document.getElementById('js-count').textContent = votes.JavaScript;
  document.getElementById('py-count').textContent = votes.Python;
  document.getElementById('java-count').textContent = votes.Java;
}

// Handle vote button clicks
function vote(language) {
  votes[language]++;
  updateVotes();
}

// Simulate real-time votes every 2 seconds
setInterval(() => {
  const languages = Object.keys(votes);
  const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
  votes[randomLanguage]++;
  updateVotes();
}, 2000);

// Initial display
updateVotes();
