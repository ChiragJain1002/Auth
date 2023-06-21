const nameInput = document.querySelector('.name');
const form = document.querySelector('form');
const formPassword = document.querySelector('.password');
const securityBar = document.querySelector('.security-bar');
const output = document.querySelector('.output');
const show = document.querySelector('.show');

form.addEventListener('click', (e) => {
  if(e.target.tagName = 'input'){
    e.target.placeholder = '';
  }
});

formPassword.oninput = function() {
  let length = formPassword.value.length;
  securityBar.style.width = length * 43.8 + 'px'; 
  if(length < 6) {
    changeColor('red');
    output.textContent = 'your password is unreliable';
  } else if(length > 6 && length <= 9) {
    changeColor('green');
  } else if (length >= 9){
    changeColor('gold');
    output.textContent = 'your password is very strong';
  }
};

show.addEventListener('click', () => {
    show.classList.toggle('active');
    if(show.classList.contains('active')) {
      show.textContent = 'Hide';
      formPassword.type = 'text';
  } else {
    show.textContent = 'Show';
    formPassword.type = 'password';
  }
  });

function changeColor(arg) {
  securityBar.style.backgroundColor = arg;
}