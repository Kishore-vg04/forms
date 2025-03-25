document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("fetch_students.php");
        
        if (!response.ok) {
            throw new Error("HTTP error! Status: " + response.status);
        }

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

        students.forEach((student, index) => {
            const card = document.createElement("div");
            card.classList.add("card1");

            card.innerHTML = `
                <div class="container">
                    <table class="detail-table">
                        <tr><td><b>Name:</b> ${student.name}</td></tr>
                        <tr><td><b>Roll No:</b> ${student.rollNo}</td></tr>
                        <tr><td><b>From Date:</b> ${student.fromDate}</td></tr>
                        <tr><td><b>To Date:</b> ${student.toDate}</td></tr>
                        <tr><td><b>Reason:</b> ${student.reason}</td></tr>
                    </table>
                    <div class="approval-status">
                        <button class="approve" onclick="approveRequest(${index})">Approve</button>
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


function toggleRemark(button) {
    const remarkSection = button.closest(".card1").querySelector(".remark-content");
    remarkSection.style.display = remarkSection.style.display === "none" ? "block" : "none";
}

function approveRequest(index) {
    let approvedRequests = JSON.parse(localStorage.getItem("approvedRequests")) || [];

    fetch("fetch_students.php")
        .then((response) => response.json())
        .then((students) => {
            approvedRequests.push(students[index]); // Store approved request

            localStorage.setItem("approvedRequests", JSON.stringify(approvedRequests));

            console.log("Approved Requests Saved:", approvedRequests); // Debugging

            document.getElementsByClassName("card1")[index].remove();

            alert("Request approved and sent to HOD for final approval!");
        })
        .catch((error) => console.error("Error approving request:", error));
}

