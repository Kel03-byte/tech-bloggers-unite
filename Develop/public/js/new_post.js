const newPostFormHandler = async (event) => {
    event.preventDefault();

    const post_title = document.querySelector('#post-title').value;
    const post_content = document.querySelector('#post-content').value;

    if (post_title && post_content) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                post_title,
                post_content,
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create a new post! ' + response.statusText);
        }
    }
}

const logInButton = document.getElementById('new-btn')
logInButton.addEventListener('click', newPostFormHandler);