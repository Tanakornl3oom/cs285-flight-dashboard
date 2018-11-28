import "./env";

import path from "path";
import bodyParser from "body-parser";
import axios from "axios";
import logger from "morgan";

import express from "express";
const app = express();

/* configure express router */
app.use(logger("dev"));

app.set("views", path.join(__dirname, "views"));

// set the view engine to ejs
app.set("view engine", "ejs");

// json middleware
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

const publicPath = path.join(__dirname) + "/public";

const DEFAULT_SIZE = 3;

let FLIGHTS;
axios.get("https://api.myjson.com/bins/1emzyg").then(({ data }) => {
  FLIGHTS = data;
});

app.use("/", express.static(publicPath));

app.get("/", (req, res) => {
  // res.sendFile(`${publicPath}/flight.html`);
  res.render("flight");
});

app.get("/flight/search", (req, res) => {
  res.render("flight");
  //   res.sendFile(`${publicPath}/flight.html`);
});

app.get("/flight/list", (req, res) => {
  res.render("listflight");
  //   res.sendFile(`${publicPath}/listflight.html`);
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
  console.log(pageNumber, itemsPerPage);
  const offset = (parseInt(pageNumber) - 1) * parseInt(itemsPerPage);

  res.json({
    statusCode: 200,
    flights: FLIGHTS.slice(offset, parseInt(offset) + parseInt(itemsPerPage)),
    pageNumber,
    itemsPerPage,
    flightsPageTotal: Math.ceil(FLIGHTS.length / parseInt(itemsPerPage))
  });
});

app.get("/JS4/searchFlight.html", (req, res) => {
  res.sendFile(`${publicPath}/flight.html`);
});

app.get("/JS4/listFlights.html", (req, res) => {
  res.sendFile(`${publicPath}/listflight-listview.html`);
});

app.get("/JS4/displayFlights.html", (req, res) => {
  res.sendFile(`${publicPath}/listflight.html`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Start server at port: ${PORT}`);
});
