// Function to sign the user up to the site and then directed to the Dashboard Page

const signUpButton = document.querySelector('#sign-up-btn');
const userNameInput = document.querySelector('#username');
const userPasswordInput = document.querySelector('#password');

const signupFormHandler = async (event) => {
  event.preventDefault();
  const username = userNameInput.value.trim().toUpperCase();
  const password = userPasswordInput.value;

  if (username && password) {
    const response = await fetch('/api/users', {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Unable to sign you up!');
      return
    }
  } else if (password < 8) {
    alert('Password must be 8 or more characters!')
    return
  }
};

signUpButton.addEventListener('click', signupFormHandler);