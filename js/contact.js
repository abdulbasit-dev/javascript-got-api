const contactForm = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const subject = document.querySelector('#subject');
const email = document.querySelector('#email');

//show error function
function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group error';
  const small = formGroup.querySelector('small');
  small.innerText = message;
}

//show success outline
function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = 'form-group success';
}

function checkRequire(inputArr) {
  //for each is a high order array method
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

function isValidEmail(input, min) {
  //check length
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} character`);
  } else {
    //check for valid email
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'email is not valid');
    }
  }
}

//check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} character`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than least ${max} character`);
  } else {
    showSuccess(input);
  }
}

function getFieldName(input) {
  return input.id;
}

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  checkRequire([nameInput, subject, email]);
  checkLength(nameInput, 4, 50);
  checkLength(subject, 10, 50);
  isValidEmail(email, 25);

  //show message if there is no error class
  if (!document.querySelectorAll('.error').length) {
    document.querySelector('.success-message').className = 'success-message show';
  }

  //hide pass meesage
  setTimeout(() => {
    document.querySelector('.success-message').className = 'success-message hide';
  }, 3000);
});
