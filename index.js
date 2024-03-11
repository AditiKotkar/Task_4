const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

// student database
const studentConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "students"
});

studentConnection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("Student MySQL Database is connected Successfully");
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/student/:RollNumber', (req, res) => {
    const RollNumber = req.params.RollNumber;
    const query = `SELECT * FROM students WHERE RollNumber = ?`;

    studentConnection.query(query, [RollNumber], (error, results) => {
        if (error) throw error;
     
        if (results.length > 0) {
            const students = results[0];
            const message = `Hi, ${students.name} <br>
            Roll Number: ${students.RollNumber} <br>
            Class: ${students.class}`;

            res.send(message);
        }
        else {
            res.status(404).send('student not found');
            return;
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});