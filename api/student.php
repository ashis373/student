<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
include "db.php";


$method = $_SERVER['REQUEST_METHOD'];


// GET students

if($method=="GET"){

$result = $conn->query(
"SELECT * FROM students ORDER BY id DESC"
);


$data=[];

while($row=$result->fetch_assoc()){
    $data[]=$row;
}


echo json_encode($data);

}



// POST student

if($method=="POST"){


$input=json_decode(
file_get_contents("php://input"),
true
);


$name=$input['student_name'];
$roll=$input['roll_no'];
$class=$input['class_name'];


$sql=$conn->prepare(
"INSERT INTO students(student_name,roll_no,class_name)
VALUES(?,?,?)"
);


$sql->bind_param(
"sss",
$name,
$roll,
$class
);


$sql->execute();


echo json_encode([
"message"=>"Student Added"
]);

}


?>