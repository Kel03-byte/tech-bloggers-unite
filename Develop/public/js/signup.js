function signupFormHandler(event){
  event.preventDefault();
  document.location.replace('/dashboard');
}

const signUpButton = document.getElementById('sign-up-btn')
signUpButton.addEventListener('click', signupFormHandler);