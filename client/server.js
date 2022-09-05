const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');
require('dotenv/config');
const privateKey  = fs.readFileSync('sslcerts/private.key', 'utf8');
const certificate = fs.readFileSync('sslcerts/certificate.crt', 'utf8')
const credentials = {key: privateKey, cert: certificate};


const PORT = process.env.PORT || 80;
const SSL_PORT = process.env.SSL_PORT || 443;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, ".well-known")));
app.use(express.static(path.resolve(__dirname, 'build')));
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app)
httpServer.listen(PORT, () => {
	console.log(`Server started on ${PORT}`);
});

httpsServer.listen(SSL_PORT,() => {
	console.log(`Server started on ${SSL_PORT}`);
});
