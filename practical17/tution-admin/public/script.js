const form = document.getElementById('studentForm');
const table = document.getElementById('studentTable');
const submitBtn = document.getElementById('submitBtn');
const studentIdInput = document.getElementById('studentId');

async function fetchStudents() {
  const res = await fetch('/api/students');
  const data = await res.json();
  table.innerHTML = data.map(student => `
    <tr>
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.phone}</td>
      <td>${student.course}</td>
      <td>
        <button class="edit" onclick="editStudent('${student._id}', '${student.name}', '${student.email}', '${student.phone}', '${student.course}')">Edit</button>
        <button class="delete" onclick="deleteStudent('${student._id}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = studentIdInput.value;
  const student = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    course: form.course.value
  };

  if (id) {
    await fetch(`/api/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    submitBtn.textContent = 'Add Student';
  } else {
    await fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
  }

  form.reset();
  studentIdInput.value = '';
  fetchStudents();
});

async function deleteStudent(id) {
  if (confirm('Are you sure you want to delete this student?')) {
    await fetch(`/api/students/${id}`, { method: 'DELETE' });
    fetchStudents();
  }
}

function editStudent(id, name, email, phone, course) {
  studentIdInput.value = id;
  form.name.value = name;
  form.email.value = email;
  form.phone.value = phone;
  form.course.value = course;
  submitBtn.textContent = 'Update Student';
}

fetchStudents();
