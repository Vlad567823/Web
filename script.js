const form = document.getElementById('contact-form');
const list = document.getElementById('contact-list');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
let editIndex = null;

// Рендер контактів
function renderContacts() {
  list.innerHTML = '';

  contacts.forEach((contact, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <strong>${contact.firstName} ${contact.lastName}</strong><br>
      📞 ${contact.phone}<br>
      ✉️ ${contact.email}
      <div class="actions">
        <button onclick="editContact(${index})">Редагувати</button>
        <button onclick="deleteContact(${index})">Видалити</button>
      </div>
    `;

    list.appendChild(li);
  });

  localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Додавання / редагування
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const contact = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    phone: formData.get('phone'),
    email: formData.get('email'),
  };

  if (editIndex !== null) {
    contacts[editIndex] = contact;
    editIndex = null;
  } else {
    contacts.push(contact);
  }

  form.reset();
  renderContacts();
});

// Видалення
function deleteContact(index) {
  contacts.splice(index, 1);
  renderContacts();
}

// Редагування
function editContact(index) {
  const contact = contacts[index];

  form.firstName.value = contact.firstName;
  form.lastName.value = contact.lastName;
  form.phone.value = contact.phone;
  form.email.value = contact.email;

  editIndex = index;
}


renderContacts();