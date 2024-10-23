document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tokenForm');
  const responseMessage = document.getElementById('responseMessage');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the token from the input field
    const token = document.getElementById('token').value;

    try {
      // Send the request to the API with the token in the headers
      const response = await fetch('http://localhost:3000/plant/all', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
          'Content-Type': 'application/json',
        },
      });

      // Handle the response
      if (response.ok) {
        const result = await response.json();
        responseMessage.textContent = `Success: ${JSON.stringify(result)}`;
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
