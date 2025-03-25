<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Debugging: Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Handle preflight OPTIONS request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "automation";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]));
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->username) || !isset($data->password)) {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit;
}

$username = $data->username;
$password = $data->password;

// Use prepared statements to prevent SQL injection
$sql = "SELECT * FROM login WHERE username=? AND password=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(["status" => "success", "role" => $row["username"]]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
}

$stmt->close();
$conn->close();
?>
