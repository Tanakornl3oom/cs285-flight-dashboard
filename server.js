var http = require("http");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
var express = require("express");
var app = express();

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/searchflight", (req, res) => {
  res.sendFile(path.join(__dirname, "flight.html"));
});

app.use("/listflight", (req, res) => {
  res.sendFile(path.join(__dirname, "listflight.html"));
});

app.get("/flight/:page", (req, res) => {
  const page = req.params.page;

  res.writeHead(200, { "Content-Type": "application/json" });
  var obj1 = JSON.stringify([
    {
      price: "4000",
      airLine: "thai Airway",
      takeOff: "suwanaphum",
      landing: "Don Munag",
      stop: "thai"
    },
    {
      price: "4000",
      airLine: "thai Airway",
      takeOff: "suwanaphum",
      landing: "Don Munag",
      stop: "Hongkong"
    },
    {
      price: "4000",
      airLine: "thai Airway",
      takeOff: "suwanaphum",
      landing: "Don Munag",
      stop: "Malaysia"
    }
  ]);

  var obj2 = JSON.stringify([
    {
      price: "5000",
      airLine: "thai Airway",
      takeOff: "suwanaphum",
      landing: "Don Munag",
      stop: "thai"
    },
    {
      price: "3000",
      airLine: "thai Airway",
      takeOff: "suwanaphum",
      landing: "Don Munag",
      stop: "Hongkong"
    },
    {
      price: "2000",
      airLine: "thai Airway",
      takeOff: "suwanaphum",
      landing: "Don Munag",
      stop: "Malaysia"
    }
  ]);

  var obj3 = JSON.stringify([
    {
      price: "6000",
      airLine: "thai Airway",
      takeOff: "suwanaphum",
      landing: "Don Munag",
      stop: "thai"
    },
    {
      price: "7000",
      airLine: "thai Airway",
      takeOff: "suwanaphum",
      landing: "Don Munag",
      stop: "Hongkong"
    },
    {
      price: "8000",
      airLine: "thai Airway",
      takeOff: "suwanaphum",
      landing: "Don Munag",
      stop: "Malaysia"
    }
  ]);

  page === "1"
    ? res.end(obj1)
    : page === "2"
      ? res.end(obj2)
      : page === "3"
        ? res.end(obj3)
        : res.end("404 Not Found");
});

app.listen(3000, () => {
  console.log("start server");
});

// http
//   .createServer(function(req, res) {
//     if (req.url === "/searchflight1") {
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.end(
//         JSON.stringify([
//           {
//             price: "4000",
//             airLine: "thai Airway",
//             takeOff: "suwanaphum",
//             landing: "Don Munag",
//             stop: "thai"
//           },
//           {
//             price: "4000",
//             airLine: "thai Airway",
//             takeOff: "suwanaphum",
//             landing: "Don Munag",
//             stop: "Hongkong"
//           },
//           {
//             price: "4000",
//             airLine: "thai Airway",
//             takeOff: "suwanaphum",
//             landing: "Don Munag",
//             stop: "Malaysia"
//           }
//         ])
//       );
//     } else if (req.url === "/listflight") {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       fs.readFile("./listflight.html", function(err, text) {
//         res.end(text);
//       });
//     }else if (req.url === "/searchflight") {
//       res.writeHead(200, { "Content-Type": "text/html" });
//       fs.readFile("./flight.html", function(err, text) {
//         res.end(text);
//       });
//     } else {
//       res.writeHead(404, { "Content-Type": "text/plain" });
//       return res.end("404 Not Found");
//     }
//   })
//   .listen(8090);
