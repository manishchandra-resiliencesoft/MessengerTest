const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Use middleware to parse JSON requests
app.use(bodyParser.json());

// Define a simple endpoint
app.get("/dummy", (req, res) => {
  res.json({ message: "This is a dummy response for testing." });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
