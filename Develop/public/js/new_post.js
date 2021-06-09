const newPostFormHandler = async (event) => {
    event.preventDefault();

    const titleInput = document.querySelector('#post-title');
    const contentInput = document.querySelector('#post-content');
    const title = titleInput.value.trim()
    const content = contentInput.trim();

    if (title && content) {
        const response = await fetch('/api/post', {
            method: 'post',
            body: JSON.stringify({
                title,
                content,
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

document.querySelector('#new-btn').addEventListener('click', newPostFormHandler);