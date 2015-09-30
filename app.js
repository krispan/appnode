var express=require('express'),
	app=express(),
	server=require('http').createServer(app),
	io=require('socket.io').listen(server);

var bodyParser = require('body-parser');

var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root123',
  database : 'testdb'
});
app.use(bodyParser());
server.listen(8080);


app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/bower_components'));
io.sockets.on('connection', function(socket){
	socket.on('send msg', function(dd){
		io.sockets.emit('get msg',dd)

	})

	console.log("done");

});

app.get('/api/services/departments',function (req,res){

pool.getConnection(function(err, connection) {
  // Use the connection

  connection.query( 'SELECT * from departments', function(err, rows) {
    // And done with the connection.
    res.send(rows);
    connection.release();

    // Don't use the connection here, it has been returned to the pool.
  });
});



});



app.post('/api/services/departments',function (req,res){

did=req.body.id;
dname=req.body.name;
console.log(req.body);


pool.getConnection(function(err, connection) {
  // Use the connection

  connection.query( 'insert into departments (DEPT_ID,DEPT_NAME) values("'+did+'","'+dname+'")', function(err, rows) {
    // And done with the connection.
    res.send(rows);
    connection.release();

    // Don't use the connection here, it has been returned to the pool.
  });
});

});

app.put('/api/services/departments',function (req,res){

did=req.body.DEPT_ID;
dname=req.body.DEPT_NAME;
id=req.body.ID;
console.log(req.body);


pool.getConnection(function(err, connection) {
  // Use the connection

  connection.query( 'update departments set DEPT_ID="'+did+'",DEPT_NAME="'+dname+'" where ID="'+id+'"', function(err, rows) {
    // And done with the connection.
    res.send(rows);
    connection.release();

    // Don't use the connection here, it has been returned to the pool.
  });
});



});



app.delete('/api/services/departments',function (req,res){

id=req.body.ID;
console.log(req.body);


pool.getConnection(function(err, connection) {
  // Use the connection

  connection.query( 'delete from departments where ID="'+id+'"', function(err, rows) {
    // And done with the connection.
    res.send(rows);
    connection.release();

    // Don't use the connection here, it has been returned to the pool.
  });
});



});

