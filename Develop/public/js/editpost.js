// Function to Edit a Post

const editPostButton = document.querySelector('#edit-post-btn');
const postTitleInput = document.querySelector('#post-title');
const postContentInput = document.querySelector('#post-content');

const editPostFormHandler = async (event) => {
    event.preventDefault();
    const post_title = postTitleInput.value
    const post_content = postContentInput.value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (post_title && post_content) {
        const response = await fetch(`/api/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                post_title,
                post_content,
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/dashboard");
            console.log('Your post has been edited')
        } else {
            alert("Unable to edit your post!");
        }
    }
};

editPostButton.addEventListener('click', editPostFormHandler)