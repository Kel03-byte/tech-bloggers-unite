const addCommentFormHandler = async (event) => {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const commentInput = document.querySelector('#comment-text');
    const comment_text = commentInput.value.trim();

    if (title && content) {
        const response = await fetch(`/api/comment`, {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text,
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to post the comment! ' + response.statusText);
        }
    }
}

document.querySelector('#add-btn').addEventListener('click', addCommentFormHandler);