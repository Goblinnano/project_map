<?php
session_start();

require_once "config/db.php";

// Handle data insertion
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['submit'])) {
        $start_x = $_POST['start_x'] ?? null;
        $start_y = $_POST['start_y'] ?? null;
        $end_x = $_POST['end_x'] ?? null;
        $end_y = $_POST['end_y'] ?? null;
        $data = $_POST['data'] ?? null;

        if ($start_x !== null && $start_y !== null && $end_x !== null && $end_y !== null && $data !== null) {
            $sql = "INSERT INTO map (start_x, start_y, end_x, end_y, data) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$start_x, $start_y, $end_x, $end_y, $data]);

            echo "success";
        } else {
            $_SESSION['error'] = "Please fill all required fields.";
            header("location:index.php");
            exit();
        }
    }

    // Handle data deletion
    if (isset($_POST['delete'])) {
        $id = $_POST['id'] ?? null;

        if ($id && is_numeric($id)) {
            $sql = "DELETE FROM map WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->execute([$id]);

            echo "success";
        } else {
            echo "Invalid ID.";
        }
        exit(); // หลังจากการลบแล้ว ให้หยุดการประมวลผลเพิ่มเติม
    }
}

// Handle data retrieval
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM map";
    $stmt = $conn->query($sql);

    echo "<h2>All Data from the map Table</h2>";
    echo "<table border='1'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Start X</th>
                    <th>Start Y</th>
                    <th>End X</th>
                    <th>End Y</th>
                    <th>Data</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>";

    // Fetch and display all rows
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>
                <td>{$row['id']}</td>
                <td>{$row['start_x']}</td>
                <td>{$row['start_y']}</td>
                <td>{$row['end_x']}</td>
                <td>{$row['end_y']}</td>
                <td>{$row['data']}</td>
                <td>
                    <form method='POST'>
                        <input type='hidden' name='id' value='{$row['id']}'>
                        <input type='submit' name='delete' value='Delete'>
                    </form>
                </td>
            </tr>";
    }

    echo "</tbody></table>";
}
?>
