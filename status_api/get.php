<?php

include_once('config_setup.php');

$res = mysqli_query($gDB, 'SELECT * FROM ' . $table);

$messages = mysqli_fetch_all($res, MYSQLI_ASSOC);

mysqli_close($gDB);

header('Access-Control-Allow-Origin: *', false);
header('Content-Type: application/json', false);
die(json_encode($messages));
