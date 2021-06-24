// Function to Add a new Comment

const addCommentButton = document.querySelector('#comment-btn');
const commentTextInput = document.querySelector('#comment-text');

const newCommentFormHandler = async (event) => {
    event.preventDefault();
    const comment_text = commentTextInput.value
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    if (comment_text) {
        const response = await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({
                comment_text,
                post_id,
            }),
            headers: { "Content-Type": "application/json" },
        });

              if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Unable to create your comment!");
        }
    }
};

addCommentButton.addEventListener('click', newCommentFormHandler)