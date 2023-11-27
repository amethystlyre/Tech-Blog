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

const updatePostButtonHandler = async (event) => {
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
            document.querySelector('#update-post-title').value=data.title;
            document.querySelector('#update-post-content').value=data.content;
        } else {
            alert('Failed to get details');
        }
        
    }
};

document
    .querySelector('#post-list')
    .addEventListener('click', updatePostButtonHandler);

const updatePostFormHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/projects/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ name, needed_funding, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete project');
        }
    }
};
