const deletePostFormHandler = async (event) => {
    event.preventDefault();

    const id = window.location.toString().split('/') [
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete the post! ' + response.statusText);
    }
}

document.querySelector('#delete-btn').addEventListener('click', deletePostFormHandler);