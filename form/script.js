const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordConfirm');

function showError(element, message) {
  const formControl = element.parentElement;
  const small = formControl.querySelector('small');

  formControl.className = 'form-control error';
  small.innerText = message;
}

function showSuccess(element) {
  const formElement = element.parentElement;
  formElement.className = 'form-control success';
}

function checkRequired(elements) {
  for (let element of elements) {
    if (element.value === '') {
      showError(element, 'This field is required');
    } else {
      showSuccess(element);
    }
  }
}

function checkMinLength(element, min) {
  if (element.value.trim() < min) {
    showError(element, `Length of value must be at least ${min}`);
  } else {
    showSuccess(element);
  }
}

function checkEquality(element1, element2) {
  if (element1.value !== element2.value) {
    showError(element2, 'Password do not match');
  }
}

function checkEmail(element) {
  const regex = /^([A-z]){3,}@{1}([A-z]){3,}\.([A-z]){2,4}$/;

  if (regex.test(element.value.trim())) {
    showSuccess(element);
  } else {
    showError(element, 'Email is not valid');
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, passwordConfirm]);
  checkMinLength(username, 3);
  checkMinLength(password, 6);
  checkMinLength(passwordConfirm, 6);
  checkEmail(email);
});
