// Function to Delete a Post

const deletePostButton = document.querySelector('#delete-post-btn');

const deletePostFormHandler = async (event) => {
    event.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
            post_id: id,
        }),
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.replace("/dashboard");
        console.log('Your post has been deleted')
    } else {
        alert("Unable to delete your post!");
    }
};

deletePostButton.addEventListener('click', deletePostFormHandler)