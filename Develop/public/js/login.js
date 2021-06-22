// Function to log the user into the site and then directed to the Dashboard Page

const logInButton = document.querySelector('#log-in-btn');
const userNameInput = document.querySelector('#username');
const userPasswordInput = document.querySelector('#password');

const loginFormHandler = async (event) => {
  event.preventDefault();
  const username = userNameInput.value.trim().toUpperCase();
  const password = userPasswordInput.value;

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Unable to login!");
    }
  }
};

logInButton.addEventListener('click', loginFormHandler);