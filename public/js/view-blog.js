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

// delete comment? (not right now)


// // edit blog
// const editBlog = async (event) => {
//     event.preventDefault();
//     if (event.target.hasAttribute('data-id')) {

//         const id = event.target.getAttribute('data-id');

//         if (comment) {
//             const response = await fetch(`/api/blog${id}`, {
//                 method: 'PUT',
//                 body: JSON.stringify({ blog_title, blog_content }),
//                 headers: { 'Content-type': 'application/json' },
//             });
            
//             if (response.ok) {
//                 document.location.reload();
//             } else {
//                 alert("Error, try again later. Think of a better comment too.");
//             }
//         }
//     }
// };

// delete blog
const deleteBlog = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        
        const response = await fetch(`/api/blog${id}`, {
            method: 'DELETE',
        });
        
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert("Error, try again later. Think of a better comment too.");
        }
    }
};


document
    .querySelector('.create-comment-btn')
    .addEventListener('click', createComment);

