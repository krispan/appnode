var express=require('express'),
	app=express(),
	server=require('http').createServer(app),
	io=require('socket.io').listen(server);

var bodyParser = require('body-parser');



app.use(bodyParser());










var SampleApp = function() {

   









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



 //  Scope.
    var self = this;


    /*  ================================================================  */
    /*  Helper functions.                                                 */
    /*  ================================================================  */

    /**
     *  Set up server IP address and port # using env variables/defaults.
     */
    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    /**
     *  Populate the cache.
     */
    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };


    /**
     *  Retrieve entry (content) from cache.
     *  @param {string} key  Key identifying content to retrieve from cache.
     */
    self.cache_get = function(key) { return self.zcache[key]; };


    /**
     *  terminator === the termination handler
     *  Terminate server on receipt of the specified signal.
     *  @param {string} sig  Signal to terminate on.
     */
    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    /**
     *  Setup termination handlers (for exit and a list of signals).
     */
    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    /*  ================================================================  */
    /*  App server functions (main app logic here).                       */
    /*  ================================================================  */

    /**
     *  Create the routing table entries + handlers for the application.
     */
    self.createRoutes = function() {
        self.routes = { };

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function(req, res) {
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
        };
    };


    /**
     *  Initialize the server (express) and create the routes and register
     *  the handlers.
     */
    self.initializeServer = function() {
        self.createRoutes();
        self.app = express.createServer();

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };


    /**
     *  Initializes the sample application.
     */
    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};   /*  Sample Application.  */


/**
 *  main():  Main code.
 */
var zapp = new SampleApp();
zapp.initialize();
zapp.start();

