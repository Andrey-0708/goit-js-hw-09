const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const STORAGE_KEY = 'feedback-form-state';

// 1. Початковий об'єкт formData
let formData = {
  email: '',
  message: '',
};

// 2. Завантаження даних з localStorage при старті
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };
    emailInput.value = parsedData.email || '';
    messageInput.value = parsedData.message || '';
  } catch (e) {
    console.error('Помилка при розборі даних з localStorage:', e);
  }
}

// 3. Обробник input: делегування + збереження у localStorage
form.addEventListener('input', event => {
  if (event.target.name in formData) {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// 4. Обробник submit: валідація, логування, очищення
form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form submitted with data:', formData);

  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});
