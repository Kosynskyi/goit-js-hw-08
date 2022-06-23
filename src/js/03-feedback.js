import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const mailEl = document.querySelector('[name="email"]');
const messageEl = document.querySelector('[name="message"]');

const formData = {};
const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

/*
 * -Останавливает поведение по умолчанию
 * -Консолим объект
 * -Убираем сообщение из хранилища
 * -Очищаем форму
 */
function onFormSubmit(event) {
  event.preventDefault();
  if (mailEl.value === '' || messageEl.value === '') {
    return alert('Please, fill in form fields and push the button «Submit»');
  }
  console.log(formData);
  event.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}
/*
 * - получаем значение поля
 * - сохраняем его в хранилище
 */
function onTextareaInput(event) {
  const messageForm = event.target.value;
  localStorage.setItem(STORAGE_KEY, messageForm);

  formData[mailEl.name] = mailEl.value;
  formData[messageEl.name] = messageEl.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

/*
 *-получаем значение из хранилища
 *-если там что-то было, обновляем DOM
 */
function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);
  if (!parsedMessage) {
    return;
  }
  mailEl.value = parsedMessage.email;
  messageEl.value = parsedMessage.message;
}
