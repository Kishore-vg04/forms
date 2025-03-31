document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("fetch_students.php"); // Fetch student data
        if (!response.ok) throw new Error("HTTP error! Status: " + response.status);

        const students = await response.json();
        if (students.error) {
            console.error("Server Error:", students.error);
            return;
        }

        const container = document.getElementById("warden-container");
        container.innerHTML = ""; // Clear previous content

        // Filter students approved by HOD but not yet finalized
        const pendingWardenApproval = students.filter(student => student.approved_by_hod == 1 && student.final_approval == 0);

        if (pendingWardenApproval.length === 0) {
            container.innerHTML = "<p>No pending requests for Warden approval.</p>";
            return;
        }

        pendingWardenApproval.forEach((student) => {
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
                        <tr><td><b>Mode:</b> ${student.mode}</td></tr>
                    </table>
                    <div class="approval-status">
                        <button class="approve" onclick="finalApprove(${student.id})">Final Approve</button>
                        <button class="disapprove" onclick="toggleRemark(this)">Disapprove</button>
                    </div>
                </div>
                <div class="remark-content" style="display: none;">
                    <div class="disapproval-reason">
                        <label for="remarks">Remarks:</label>
                        <input type="text" class="inputs" placeholder="Enter remarks">
                        <button class="submit-disapproval" onclick="disapproveRequest(this, ${student.id})">Submit</button>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

// ✅ Toggle remark input visibility
function toggleRemark(button) {
    const remarkSection = button.closest(".card1").querySelector(".remark-content");
    remarkSection.style.display = remarkSection.style.display === "none" ? "block" : "none";
}

// ✅ Final approval by Warden
async function finalApprove(studentId) {
    try {
        const response = await fetch("/automation/backend/final_approve.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: studentId }),
        });

        const result = await response.json();
        if (result.success) {
            alert("Request approved successfully!");
            document.querySelector(`.approve[data-id='${studentId}']`)?.closest(".card1")?.remove();
        } else {
            alert("Approval failed: " + result.error);
        }
    } catch (error) {
        console.error("Error approving request:", error);
    }
}

// ✅ Handle disapproval
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
