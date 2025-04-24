document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        let isValid = true;

        // Basic client-side validation
        if (!email) {
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            emailError.textContent = 'Invalid email format.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        if (!password) {
            passwordError.textContent = 'Password is required.';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }

        if (isValid) {
            const userData = {
                email: email,
                password: password
            };

            try {
                const response = await fetch('http://localhost:8080/api/login', { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    messageDiv.textContent = data.message || 'Login successful!';
                    messageDiv.className = 'success-message';
                    // Simulate fetching user details and navigating (replace with your actual logic)
                    setTimeout(() => {
                        window.location.href = '/index.html'; // Redirect on success
                        // In a real application, you might set cookies or tokens here
                        // and then redirect.
                    }, 1500);
                } else {
                    messageDiv.textContent = data.message || 'Login failed. Invalid credentials.';
                    messageDiv.className = 'error-message';
                }

            } catch (error) {
                console.error('Login error:', error);
                messageDiv.textContent = 'Failed to connect to the server.';
                messageDiv.className = 'error-message';
            }
        }
    });
});