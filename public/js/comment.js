//Handles form submission for adding comment to post
const addCommentFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment').value.trim();
    const postId = document.querySelector('button').dataset.postId;

    console.log(comment);
    console.log(postId);

    if (comment) {
        const response = await fetch(`/api/comments/${postId}`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace(`/post/${postId}`);
        } else {
            alert('Failed to add comment');
        }
    }
};

document
    .querySelector('.add-comment-form')
    .addEventListener('submit', addCommentFormHandler);