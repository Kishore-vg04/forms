document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch("http://localhost/FORM/backend/login.php", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => response.json()) // Directly parse as JSON
    .then(json => {
        console.log("Server Response:", json);

        if (json.status === "success") {
            let role = json.role.toLowerCase(); // Convert to lowercase for consistency

            // Redirect based on role
            let roleRedirects = {
                "student": "student.html",
                "coordinator": "coordinator.html",
                "hod": "hod.html",
                "warden": "warden.html"
            };

            if (role in roleRedirects) {
                alert(`Login successful! Redirecting to ${roleRedirects[role]}...`);
                window.location.href = roleRedirects[role];
            } else {
                alert("Unknown role: " + role);
            }
        } else {
            document.getElementById("message").innerText = json.message;
            document.getElementById("message").style.color = "red";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("message").innerText = "Login failed. Please try again.";
        document.getElementById("message").style.color = "red";
    });
});
