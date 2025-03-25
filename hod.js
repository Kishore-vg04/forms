document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("hod-container");

    let approvedRequests = JSON.parse(localStorage.getItem("approvedRequests")) || [];

    console.log("Approved Requests Retrieved:", approvedRequests); // Debugging

    if (approvedRequests.length === 0) {
        container.innerHTML = "<p>No approved requests available.</p>";
        return;
    }

    approvedRequests.forEach((student, index) => {
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
                    <button class="approve" onclick="finalApprove(${index})">Final Approve</button>
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

    // Force refresh to ensure latest data loads
    setTimeout(() => {
        window.location.reload();
    }, 1000); // Refresh after 1 second to load data
});
