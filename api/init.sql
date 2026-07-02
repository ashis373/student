CREATE DATABASE IF NOT EXISTS docker;

USE docker;


CREATE TABLE students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100),
    roll_no VARCHAR(50),
    class_name VARCHAR(50)
);


INSERT INTO students
(student_name,roll_no,class_name)
VALUES
('Test Student','1','10');