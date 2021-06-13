function loginFormHandler(event){
    event.preventDefault();
    document.location.replace('/dashboard');
}

const logInButton = document.getElementById('log-in-btn')
logInButton.addEventListener('click', loginFormHandler);