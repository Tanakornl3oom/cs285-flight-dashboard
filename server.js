var http = require("http");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");
const axios = require("axios");
var app = express();

const public = path.join(__dirname) + "/public";

const PORT = 3000;
const DEFAULT_SIZE = 3;

let FLIGHTS;
axios.get("https://api.myjson.com/bins/1emzyg").then(({ data }) => {
	FLIGHTS = data;
});

app.use("/", express.static(public));

app.get("/", (req, res) => {
	res.sendFile(`${public}/flight.html`);
});

app.get("/flight/search", (req, res) => {
	res.sendFile(`${public}/flight.html`);
});

app.get("/flight/list", (req, res) => {
	res.sendFile(`${public}/listflight.html`);
});

const DEFAULT_ITEMS_PER_PAGE = 4;
const DEFAULT_PAGE_NUMBER = 1;
/**
 * @param itemPerPages {number} - Number of items that will display as row per page
 * @param pageNumber {number} - Number specify set of items that will display as row in that page
 */
app.get("/flights", (req, res) => {
	const {
		itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
		pageNumber = DEFAULT_PAGE_NUMBER
	} = req.query;
	const offset = (parseInt(pageNumber) - 1) * parseInt(itemsPerPage);

	res.json({
		statusCode: 200,
		flights: FLIGHTS.slice(offset, parseInt(offset) + parseInt(itemsPerPage)),
		pageNumber,
		itemsPerPage,
		flightsPageTotal: Math.ceil(FLIGHTS.length / parseInt(itemsPerPage))
	});
});

app.listen(PORT, () => {
	console.log(`Start server at port: ${PORT}`);
});
