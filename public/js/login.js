const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Login Input
    const user = document.querySelector('#login-user').value.trim();
    const pass = document.querySelector('#login-pass').value.trim();
  
    if (user && pass) {
      // POST to request api endpoint
      const res = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username: user, password: pass }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (res.ok) {
        // If successful, redirect the browser to the homepage
        document.location.replace('/');
      } else {
        alert(res.statusText);
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);