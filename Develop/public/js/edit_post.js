const editPostFormHandler = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length - 1
    ];

    const titleInput = document.querySelector('#post-title');
    const contentInput = document.querySelector('#post-content');
    const title = titleInput.value.trim()
    const content = contentInput.trim();
    
    if (title && content) {
        const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                content,
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update the post! ' + response.statusText);
        }
    }
}

document.querySelector('#update-btn').addEventListener('click', editPostFormHandler);