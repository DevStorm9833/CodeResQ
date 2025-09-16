const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // serve driver.html & user.html

// store driver location
let driverLocation = {};

// serve driver page
app.get("/driver", (req, res) => {
  res.sendFile(path.join(__dirname, "driver.html"));
});

// serve user page
app.get("/user", (req, res) => {
  res.sendFile(path.join(__dirname, "user.html"));
});

// driver updates location
app.post("/location", (req, res) => {
  const { lat, lng, accuracy } = req.body;

  driverLocation = {
    lat,
    lng,
    accuracy: accuracy || null,
    timestamp: Date.now()
  };

  console.log("Updated location:", driverLocation);
  res.json({ status: "ok" });
});

// user requests driver location
app.get("/location", (req, res) => {
  res.json(driverLocation);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
