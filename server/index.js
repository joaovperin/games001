// The required modules
var connect = require('connect');
var serveStatic = require('serve-static');

// Server Config
var Server = {
	port: 3000,
	appRoot: function(){
		return __dirname + '\\..\\app\\';
	}
}

/**
 * Starta o server na porta especificada
 */
connect().use(serveStatic(Server.appRoot())).listen(Server.port, function(){
    console.log('Servidor rodando na porta ' + Server.port + '.');
});