var http = require("http");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();

const public = path.join(__dirname) + "/public";

const PORT = 3000;
const DEFAULT_SIZE = 3;
const FLIGHTS = require("./flights.json");

app.use("/", express.static(public));

app.get("/flight/search", (req, res) => {
	res.sendFile(`${public}/flight.html`);
});

app.get("/flight/list", (req, res) => {
	res.sendFile(`${public}/listflight.html`);
});

app.get("/flights", (req, res) => {
	res.send(FLIGHTS);
});

app.listen(PORT, () => {
	console.log(`Start server at port: ${PORT}`);
});
