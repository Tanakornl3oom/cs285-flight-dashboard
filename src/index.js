import "./env";

// import "./models/test";

import path from "path";
import bodyParser from "body-parser";
import logger from "morgan";

import express from "express";
const app = express();

/**
 * configure express router
 */
app.use(logger("dev"));

app.set("views", path.join(__dirname, "views"));

// set the view engine to ejs
app.set("view engine", "ejs");

// json middleware
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

/**
 * initiate some variables
 */
import { flights as FLIGHTS, findFlightById } from "./controllers/flight";

/**
 * define routers
 */
app.get("/", (req, res) => {
  // res.sendFile(`${publicPath}/flight.html`);
  console.log(flights);
  res.render("index");
});

app.get("/flight/search", (req, res) => {
  // res.sendFile(`${publicPath}/flight.html`);
});

app.get("/flight/list", (req, res) => {
  // res.sendFile(`${publicPath}/listflight.html`);
});

app.get("/flight/:flightId/check-out", async (req, res) => {
  const { flightId } = req.params;
  try {
    const flight = await findFlightById({ flightId });
    if (!flight) throw new Error("Flight not found!");

    //TODO: res.render("ejsfile", { flight })
  } catch (error) {
    res.status(400).send(error.message || error);
  }
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Start server at port: ${PORT}`);
});
