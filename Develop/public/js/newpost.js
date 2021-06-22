// Function to Add a new Post

const addPostButton = document.querySelector('#add-post-btn');
const postTitleInput = document.querySelector('#post-title');
const postContentInput = document.querySelector('#post-content');

const newPostFormHandler = async (event) => {
    event.preventDefault();
    const post_title = postTitleInput.value
    const post_content = postContentInput.value;

    if (post_title && post_content) {
        const response = await fetch("/api/posts", {
            method: "POST",
            body: JSON.stringify({
                post_title,
                post_content,
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert("Unable to create your post!");
        }
    }
};

addPostButton.addEventListener('click', newPostFormHandler)