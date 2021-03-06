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
import Flight from "./models/Flight";
import FeeCreator from "./models/FeeCreator";

/**
 * define routers
 */
app.get("/", (req, res) => {
  // res.sendFile(`${publicPath}/flight.html`);
  res.render("flight");
});

app.get("/flight/search", (req, res) => {
  // res.sendFile(`${publicPath}/flight.html`);
  res.render("flight");
});

app.get("/flight/list", (req, res) => {
  // res.sendFile(`${publicPath}/listflight.html`);
  res.render("listflight");
});

app.get("/flight/:flightId/check-out", async (req, res) => {
  const { flightId } = req.params;
  try {
    const flight = await findFlightById({ flightId });
    if (!flight) throw new Error("Flight not found!");
    res.render("check_out", { flight });
  } catch (error) {
    res.status(400).send(error.message || error);
  }
});

app.post("/flight/:flightId/purchase", async (req, res) => {
  try {
    const { flightId } = req.params;
    const { user, insurances } = req.body;

    let responseMessage = "";

    /* Show user informations */
    const {
      title,
      firstName,
      lastName,
      birthDate,
      passport,
      country,
      passportExp
    } = user;

    responseMessage +=
      `${title}${firstName} ${lastName} | birthDate: ${birthDate}` + "\n";
    responseMessage +=
      `Passport: ${passport}${country} | expired in: ${passportExp}` + "\n";

    /* Create flight object */
    const flightObj = await findFlightById({ flightId });
    const flight = new Flight(flightObj);

    /* Fee management */
    const { bag, life } = insurances;

    let feePackage;
    if (bag && life) feePackage = "LIFENBAG";
    else if (bag) feePackage = "BAG";
    else if (life) feePackage = "LIFE";
    else feePackage = "DEFAULT";

    const feeCreator = new FeeCreator();
    const fee = feeCreator.createFee({ flight, feePackage });

    responseMessage += `Total fee: ${fee.getTotalFee()}` + "\n";

    console.log(responseMessage);
    res.status(200).send(responseMessage);
  } catch (error) {
    const errorMessage = error.message || error;
    console.log(`error: errorMessage`);
    res.status(400).send(errorMessage);
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
