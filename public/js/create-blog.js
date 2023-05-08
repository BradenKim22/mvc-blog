const createBlogFormHandler = async (event) => {
    event.preventDefault();

    const blog_title = document.querySelector('#create-blog-title').value.trim();
    const blog_content = document.querySelector('#create-blog-content').value.trim();

    if (blog_title && blog_content) {
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ blog_title, blog_content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert("Error, try again.");
        }
    }
};

document
    .querySelector('.create-blog-form')
    .addEventListener('submit', createBlogFormHandler);