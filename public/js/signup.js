const signupFormHandler = async (event) => {
    event.preventDefault();

    const user = document.querySelector('#signup-user').value.trim();
    const pass = document.querySelector('#signup-pass').value.trim();

    if (user && pass) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username: user, password: pass }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert("Error, try something else.");
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);