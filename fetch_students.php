<?php
header("Content-Type: application/json"); // Ensure JSON response

$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$database = "automation"; 

// Connect to MySQL
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed: " . $conn->connect_error]));
}

$sql = "SELECT name, rollNo, fromDate, toDate, reason FROM std_info";
$result = $conn->query($sql);

if (!$result) {
    die(json_encode(["error" => "Query failed: " . $conn->error])); // Return error if query fails
}

$students = [];

while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

echo json_encode($students); // Output JSON

$conn->close();
?>
