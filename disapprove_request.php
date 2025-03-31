<?php
header("Content-Type: application/json");
$servername = "localhost";
$username = "root";
$password = "";
$database = "automation";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data["id"]) || !isset($data["reason"])) {
    die(json_encode(["error" => "Invalid request data"]));
}

$studentId = $conn->real_escape_string($data["id"]);
$reason = $conn->real_escape_string($data["reason"]);

// Update the database to store disapproval reason
$sql = "UPDATE std_info SET approved_by_coordinator = -1, disapproval_reason = '$reason' WHERE id = '$studentId'";
if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Database update failed: " . $conn->error]);
}

$conn->close();
?>
