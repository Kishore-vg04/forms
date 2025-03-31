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

$sql = "SELECT id, name, rollno, fromdate, todate, reason, approved_by_coordinator FROM std_info";
$result = $conn->query($sql);

if (!$result) {
    die(json_encode(["error" => "Query failed: " . $conn->error]));
}

$students = [];
while ($row = $result->fetch_assoc()) {
    $students[] = $row;
}

echo json_encode($students);

$conn->close();
?>
