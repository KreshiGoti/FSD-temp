let count = localStorage.getItem('repCount') || 0;
count = parseInt(count);
updateCount();

function increment() {
  count++;
  updateCount();
}

function decrement() {
  if (count > 0) count--;
  updateCount();
}

function reset() {
  count = 0;
  updateCount();
}

function updateCount() {
  document.getElementById('count').innerText = count;
  localStorage.setItem('repCount', count);
}
