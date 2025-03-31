document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("fetch_students.php");
        if (!response.ok) throw new Error("HTTP error! Status: " + response.status);

        const students = await response.json();
        if (students.error) {
            console.error("Server Error:", students.error);
            return;
        }

        const container = document.getElementById("student-container");
        if (!container) {
            console.error("Error: #student-container not found in HTML");
            return;
        }

        students.forEach((student) => {
            // if(student.approved_by_coordinator == -1){
            //     button.closest(".card1").remove();
            // }
            if (student.approved_by_coordinator == 1) return; // Skip already approved requests

            const card = document.createElement("div");
            card.classList.add("card1");

            card.innerHTML = `
                <div class="container">
                    <table class="detail-table">
                        <tr><td><b>Name:</b> ${student.name}</td></tr>
                        <tr><td><b>Roll No:</b> ${student.rollno}</td></tr>
                        <tr><td><b>From Date:</b> ${student.fromdate}</td></tr>
                        <tr><td><b>To Date:</b> ${student.todate}</td></tr>
                        <tr><td><b>Reason:</b> ${student.reason}</td></tr>
                    </table>
                    <div class="approval-status">
                        <button class="approve" onclick="approveRequest(${student.id})">Approve</button>
                        <button class="disapprove" onclick="toggleRemark(this)">Disapprove</button>
                    </div>
                </div>
                <div class="remark-content" style="display: none;">
                    <div class="disapproval-reason">
                        <label for="remarks">Remarks:</label>
                        <input type="text" class="inputs" placeholder="Enter remarks">
                        <button class="submit-disapproval">Submit</button>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

// Function to approve request and update DB
async function approveRequest(studentId) {
    try {
        const response = await fetch("/automation/backend/approve_request.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: studentId }),
        });

        const result = await response.json();
        if (result.success) {
            alert("Request approved and sent to HOD for final approval!");
            window.location.reload();
        } else {
            alert("Approval failed: " + result.error);
        }
    } catch (error) {
        console.error("Error approving request:", error);
    }
}

// Toggle remark input visibility
function toggleRemark(button) {
    const remarkSection = button.closest(".card1").querySelector(".remark-content");
    remarkSection.style.display = remarkSection.style.display === "none" ? "block" : "none";
}

// Handle disapproval
async function disapproveRequest(button, studentId) {
    const remarkInput = button.closest(".remark-content").querySelector(".inputs");
    const remark = remarkInput.value.trim();

    if (!remark) {
        alert("Please enter a reason for disapproval.");
        return;
    }

    try {
        const response = await fetch("/automation/backend/disapprove_request.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: studentId, reason: remark }),
        });

        const result = await response.json();
        if (result.success) {
            alert("Request disapproved successfully!");
            button.closest(".card1").remove(); // Remove the card from UI
        } else {
            alert("Disapproval failed: " + result.error);
        }
    } catch (error) {
        console.error("Error disapproving request:", error);
    }
}
