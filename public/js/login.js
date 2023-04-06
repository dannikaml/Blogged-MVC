const loginForm = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // Perform validation on email and password
      if (!validateEmail(email)) {
        // Display an error message or prevent submission
        return;
      }
      if (!validatePassword(password)) {
        // Display an error message or prevent submission
        return;
      }
  
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Handle response from server
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function validatePassword(password) {
    return password.length >= 8;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.login-form').addEventListener('submit', loginForm);
  });
  