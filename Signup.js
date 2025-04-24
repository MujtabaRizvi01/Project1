document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmpassword');
    const signupMessageDiv = document.getElementById('signupMessage'); // Get the message div

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const data = {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            confirmpassword: confirmPasswordInput.value,
        };

        // Basic client-side password validation
        if (data.password !== data.confirmpassword) {
            signupMessageDiv.textContent = "Please check password and confirm password";
            signupMessageDiv.className = "error-message mt-4"; // Apply error styling
            return;
        } else {
            signupMessageDiv.textContent = ""; // Clear any previous message
            signupMessageDiv.className = "mt-4"; // Reset class
        }

        try {
            const response = await fetch('http://localhost:8080/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const dataApi = await response.json();

            if (dataApi.success) {
                signupMessageDiv.textContent = dataApi.message;
                signupMessageDiv.className = "success-message mt-4"; // Apply success styling
                setTimeout(() => {
                    window.location.href = '/login.html'; // Redirect after a short delay
                }, 1500); // Adjust delay as needed
            } else if (dataApi.error) {
                signupMessageDiv.textContent = dataApi.message;
                signupMessageDiv.className = "error-message mt-4"; // Apply error styling
            } else {
                signupMessageDiv.textContent = "An unexpected error occurred.";
                signupMessageDiv.className = "error-message mt-4"; // Apply error styling
            }

        } catch (error) {
            console.error("Error during signup:", error);
            signupMessageDiv.textContent = "Failed to connect to the server.";
            signupMessageDiv.className = "error-message mt-4"; // Apply error styling
        }
    });
});