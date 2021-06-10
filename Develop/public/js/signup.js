const userNameInput = document.querySelector('#user-signup');
const userPasswordInput = document.querySelector('#password-signup');

const signupFormHandler = async (event) => {
    event.preventDefault();
    const username = userNameInput.value.trim().toUpperCase();
    const password = userPasswordInput.value;
    if (username && password) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({
            username,
            password,
          }),
          headers: { 'Content-Type': 'application/json' }
        }); 
    
    if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Unable to sign up!');
      }
    }
}

document.querySelector('.signup-form')
document.addEventListener('submit', signupFormHandler);