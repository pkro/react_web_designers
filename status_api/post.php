<?php

include_once('config_setup.php');

$status = json_decode(file_get_contents('php://input'), true);
//2019-04-18, 15:00
$time = date("Y-m-d, H:i");

$query = "INSERT INTO $table (`msg`, `type`, `time`) VALUES (?, ?, ?)";
$stmt = mysqli_prepare($gDB, $query);
mysqli_stmt_bind_param($stmt, 'sss', $status['msg'], $status['type'], $time);
mysqli_stmt_execute($stmt);

$newID = mysqli_stmt_insert_id($stmt);

mysqli_close($gDB);

header('Access-Control-Allow-Origin: *', false);
header('Content-Type: application/json', false);
die(json_encode([
    'success' => TRUE,
    'id' => $newID,
    'time' => $time
]));
