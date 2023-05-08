const url = window.location.pathname;
const findID = url.match(/(\d+)/);
const blogID = findID[1];

const createComment = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#create-comment').value.trim();

    if (comment) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ blog_id: blogID, content: comment }),
            headers: { 'Content-type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert("Error, try again later. Think of a better comment too.");
        }
    }
};

// Edit Blog
const editBlog = async (event) => {
    event.preventDefault();
    alert('You can now edit your Title and Content.');

    document.querySelector('.blog-title').contentEditable = "true";
    document.querySelector('.blog-content').contentEditable = "true";
    document.querySelector('.edit').setAttribute('style', 'display: none');
    document.querySelector('.save').setAttribute('style', 'display:');
}

// Save edit
const saveEdit = async (event) => {
    event.preventDefault();

    document.querySelector('.blog-title').contentEditable = "false";
    document.querySelector('.blog-content').contentEditable = "false";
    document.querySelector('.edit').setAttribute('style', 'display:');
    document.querySelector('.save').setAttribute('style', 'display: none');

    const id = event.target.getAttribute('data-id');

    const blog_title = document.querySelector('.blog-title').textContent;
    const blog_content = document.querySelector('.blog-content').textContent;

    if (blog_title && blog_content) {
        const response = await fetch(`/api/blog/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ blog_title, blog_content }),
            headers: { 'Content-type': 'application/json' },
        });
        
        if (response.ok) {
            document.location.replace(`/blog/${id}`);
        } else {
            alert("Error, try to edit later.");
        }
    }
};

// delete blog
const deleteBlog = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        
        const response = await fetch(`/api/blog/${id}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert("Error, try to delete later.");
        }
    }
};

// Comment button
document
    .querySelector('.create-comment-btn')
    .addEventListener('click', createComment);

// Delete button
document
    .querySelector('.delete')
    .addEventListener('click', deleteBlog);

// Edit button
document
    .querySelector('.edit')
    .addEventListener('click', editBlog);

// Save Edit
document
    .querySelector('.save')
    .addEventListener('click', saveEdit);