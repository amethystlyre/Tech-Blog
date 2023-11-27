const newPostButtonHandler = async (event) => {
    event.preventDefault();

    const newPostForm = document.querySelector('.new-post');
    newPostForm.style.display = 'block';
};

document
    .querySelector('#new-post-btn')
    .addEventListener('click', newPostButtonHandler);

const newPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#new-post-title').value.trim();
    const content = document.querySelector('#new-post-content').value.trim();

    if (title && content) {
        const response = await fetch(`/api/posts`, {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create post');
        }
    }
};

document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostFormHandler);

const postClickHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const updatePostForm = document.querySelector('.update-post');
        updatePostForm.style.display = 'block';
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'GET',
        });

        if (response.ok) {
            let data = await response.json();
            console.log(data);
            document.querySelector('#update-post-title').value = data.title;
            document.querySelector('#update-post-content').value = data.content;
            document
                .querySelector('#update-post-btn')
                .setAttribute('data-id', id);
        } else {
            alert('Failed to get details');
        }
    }
};

document
    .querySelector('#post-list')
    .addEventListener('click', postClickHandler);

const updatePostFormHandler = async (event) => {
    const id = event.target.dataset.id;
    console.log(id);
    const title = document.querySelector('#update-post-title').value;
    const content = document.querySelector('#update-post-content').value;

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
        alert('Post has been updated');
    } else {
        alert('Failed to update post');
    }
};

document
    .querySelector('#update-post-btn')
    .addEventListener('click', updatePostFormHandler);
