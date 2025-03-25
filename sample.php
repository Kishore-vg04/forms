<!-- <?php
$servername = "localhost";
$username = "root"; // Default XAMPP MySQL username
$password = ""; // Default is empty in XAMPP
$dbname = "automation";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch data
$sql = "SELECT * FROM login";
$result = $conn->query($sql);

// Display data in an HTML table
if ($result->num_rows > 0) {
    echo "<table border='1'>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Value</th>
            </tr>";

    while ($row = $result->fetch_assoc()) {
        echo "<tr>
                <td>" . $row["username"] . "</td>
                <td>" . $row["password"] . "</td>
              </tr>";
    }
    echo "</table>";
} else {
    echo "No records found!";
}

$conn->close();
?> -->
