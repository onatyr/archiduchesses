document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const responseMessage = document.getElementById('loginResponse');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(form);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      // Send the request to the API
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Handle the response
      if (response.ok) {
        const result = await response.json();
        // Store the token in localStorage or sessionStorage
        localStorage.setItem('authToken', result.token);
        responseMessage.textContent = `Login successful with token ${result.token}`;
        responseMessage.style.color = 'green';
      } else {
        const error = await response.text();
        responseMessage.textContent = `Error: ${error}`;
        responseMessage.style.color = 'red';
      }
    } catch (error) {
      responseMessage.textContent = `Network Error: ${error.message}`;
      responseMessage.style.color = 'red';
    }
  });
});
