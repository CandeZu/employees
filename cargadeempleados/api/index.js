var Express = require('express');
var bodyParser = require('body-parser');

var app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var cors = require('cors');
app.use(cors());

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empleados'
});

var fileUpload = require('express-fileupload');
var fs=require('fs');
app.use(fileUpload());
app.use('/Photos', Express.static(__dirname + '/Photos'));

app.listen(3000, () => {
    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connected to DB!');
    });
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/department', (req, res) => {

    var query = 'SELECT * FROM  empleados.Department';
    connection.query(query, function(err, rows, fields) {
        if (err) {
            res.send('Failed');
        }
        res.send(rows);
    });

});

app.post('/api/department', (req, res) => {

    var query = `INSERT into empleados.Department
        (DepartmentName)
        VALUE (?)`;
    var values = [
        req.body['DepartmentName']
    ];
    
    connection.query(query, values, function(err, rows, fields) {
        if (err) {
            res.send('Failed');
        }
        res.json('Added successfully');
    });

});

app.put('/api/department', (req, res) => {

    var query = `UPDATE empleados.Department
        set DepartmentName=? where DepartmentId=?`;
        
    var values = [
        req.body['DepartmentName'],
        req.body['DepartmentId']
    ];
    
    connection.query(query, values, function(err, rows, fields) {
        if (err) {
            res.send('Failed');
        }
        res.json('Updated successfully');
    });

});

app.delete('/api/department/:id', (req, res) => {

    var query = `DELETE from empleados.Department
        where DepartmentId=?`;
        
    var values = [
        parseInt(req.params.id)
    ];
    
    connection.query(query, values, function(err, rows, fields) {
        if (err) {
            res.send('Failed');
        }
        res.json('Deleted successfully');
    });

});

app.get('/api/employee', (req, res) => {

    var query = 'SELECT * FROM  empleados.Employee';
    connection.query(query, function(err, rows, fields) {
        if (err) {
            res.send('Failed');
        }
        res.send(rows);
    });

});

app.post('/api/employee', (req, res) => {

    var query = `INSERT into empleados.Employee
        (EmployeeName, Department, DateOfJoining, PhotoFileName)
        VALUE (?,?,?,?)`;
    var values = [
        req.body['DepartmentName'],
        req.body['Department'],
        req.body['DateOfJoining'],
        req.body['PhotoFileName']
    ];
    
    connection.query(query, values, function(err, rows, fields) {
        if (err) {
            res.send('Failed');
        }
        res.json('Added successfully');
    });

});

app.put('/api/employee', (req, res) => {

    var query = `UPDATE empleados.Employee
        set EmployeeName=?,
        Department=?,
        DateOfJoining=?,
        PhotoFileName=? 
        where EmployeeId=?`;
        
    var values = [
        req.body['EmployeeName'],
        req.body['Department'],
        req.body['DateOfJoining'],
        req.body['PhotoFileName'],
        req.body['EmployeeId']
    ];
    
    connection.query(query, values, function(err, rows, fields) {
        if (err) {
            res.send('Failed');
        }
        res.json('Updated successfully');
    });

});

app.delete('/api/employee/:id', (req, res) => {

    var query = `DELETE from empleados.Employee
        where EmployeeId=?`;
        
    var values = [
        parseInt(req.params.id)
    ];
    
    connection.query(query, values, function(err, rows, fields) {
        if (err) {
            res.send('Failed');
        }
        res.json('Deleted successfully');
    });

});

app.post('/api/employee/savefile', (req, res) => {

    fs.writeFile('./Photos/' + req.files.file.name, 
    req.files.file.data, function(err) {
        if (err) {
            return console.log(err);
        }
        res.json(req.files.file.name);
    });

});