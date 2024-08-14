<?php
$data = empty($_POST['data']) ? "" : $_POST['data']; 
$processedData = json_decode($_POST['data']);

$pathArr = explode(".", htmlentities($processedData->namespace));
$receiver = htmlentities($processedData->receiver);
$recData = json_decode(htmlentities(json_encode($processedData->data)));

$classPath = $pathArr[0];
$class = $pathArr[1];
$method = $pathArr[2];

require_once "./{$classPath}/{$class}.php";
$className = new $class();

$send = array(
	'receiver'=>$receiver
	, 'data'=>json_encode($className->$method($processedData->data))
);	

echo json_encode($send);

?>