<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die("Method Not Allowed - Only POST requests are accepted");
}

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "student_management";

try {
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Validate and sanitize inputs
    $required_fields = ['name', 'department', 'year', 'section', 'rollno', 'fromdate', 'todate', 'mode', 'reason'];
    
    foreach ($required_fields as $field) {
        if (empty($_POST[$field])) {
            throw new Exception("All fields are required. Missing: $field");
        }
    }

    $name = htmlspecialchars($_POST['name']);
    $department = htmlspecialchars($_POST['department']);
    $year = htmlspecialchars($_POST['year']);
    $section = htmlspecialchars($_POST['section']);
    $rollno = (int)$_POST['rollno'];
    $fromdate = $_POST['fromdate'];
    $todate = $_POST['todate'];
    $mode = htmlspecialchars($_POST['mode']);
    $reason = htmlspecialchars($_POST['reason']);

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO student_forms (name, department, year, section, rollno, fromdate, todate, mode, reason) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }
    
    $stmt->bind_param("ssssissss", $name, $department, $year, $section, $rollno, $fromdate, $todate, $mode, $reason);

    // Execute the statement
    if (!$stmt->execute()) {
        throw new Exception("Execute failed: " . $stmt->error);
    }

    // Success response
    header('Content-Type: text/html; charset=utf-8');
    echo "<!DOCTYPE html>
    <html>
    <head>
        <title>Submission Successful</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .success { color: green; }
            .data { margin-top: 20px; border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
        </style>
    </head>
    <body>
        <h1 class='success'>Form submitted successfully!</h1>
        <div class='data'>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Department:</strong> $department</p>
            <p><strong>Year:</strong> $year</p>
            <p><strong>Section:</strong> $section</p>
            <p><strong>Roll No:</strong> $rollno</p>
            <p><strong>From Date:</strong> $fromdate</p>
            <p><strong>To Date:</strong> $todate</p>
            <p><strong>Mode:</strong> $mode</p>
            <p><strong>Reason:</strong> $reason</p>
        </div>
        <p><a href='../index.html'>Submit another form</a></p>
    </body>
    </html>";

} catch (Exception $e) {
    http_response_code(500);
    echo "<h1>Error</h1>";
    echo "<p>" . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<p><a href='../index.html'>Go back to form</a></p>";
} finally {
    // Close connections if they exist
    if (isset($stmt)) $stmt->close();
    if (isset($conn)) $conn->close();
}
?>