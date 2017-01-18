// The required modules
var connect = require('connect');
var serveStatic = require('serve-static');

// Server Config
const Server = {
	port: 8080,
	appRoot: function(){
		return __dirname + '\\..\\app\\';
	}
}

/**
 * Starta o server na porta especificada
 */
var app = connect();
app.use(serveStatic(Server.appRoot()));
app.use(function(req, res, next){
	switch (req.url) {
		/*
      case '/404':
        var body = '404 test';
        res.statusCode = 404;
        res.setHeader('Content-Length', body.length);
        res.end(body);
        break;
        */
      default:
        //var body = 'my page';
        //res.setHeader('Content-Length', body.length);
        //res.end('Page Not Found :/');
    }
});

app.listen(Server.port, function(){
    console.log('Servidor rodando na porta ' + Server.port + '.');
});