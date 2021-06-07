const userNameInput = document.querySelector('#user-signup');
const userPasswordInput = document.querySelector('#password-signup');

const loginFormHandler = async (event) => {
    event.preventDefault();
    const username = userNameInput.value.trim().toUpperCase();
    const password = userPasswordInput.value;
    if (username && password) {
        const response = await fetch('/api/users', {
          method: 'post',
          body: JSON.stringify({
            username,
            password,
          }),
          headers: { 'Content-Type': 'application/json' }
        }); 
    
    if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Unable to log in!');
      }
    }
}

document.querySelector('.login-form')
document.addEventListener('submit', loginFormHandler);