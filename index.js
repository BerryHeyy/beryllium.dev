const fs = require("fs");
const https = require("https");
const express = require("express");

const app = express();

const private_key = fs.readFileSync("/etc/letsencrypt/live/www.beryllium.dev/privkey.pem", "utf-8");

const certificate = fs.readFileSync("/etc/letsencrypt/live/www.beryllium.dev/fullchain.pem", "utf-8");

const ca = fs.readFileSync("/etc/letsencrypt/live/www.beryllium.dev/fullchain.pem", "utf-8");

const credentials = {
	key: private_key,
	cert: certificate,
	ca: ca
};

app.get("/", (req, res) => {
	console.log("Test");

	res.sendFile(__dirname + "/index.html");
});

const httpsServer = https.createServer(certificate, app);

httpsServer.listen(443);
