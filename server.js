const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Add support for GET requests to our webhook
app.get("/messaging-webhook", (req, res) => {
	console.log("requetsedd==============>");
	// Parse the query params
	let mode = req.query["hub.mode"];
	let token = req.query["hub.verify_token"];
	let challenge = req.query["hub.challenge"];

	// Check if a token and mode is in the query string of the request
	if (mode && token) {
		// Check the mode and token sent is correct
		if (mode === "subscribe" && token === "token") {
			// Respond with the challenge token from the request
			console.log("WEBHOOK_VERIFIED");
			res.status(200).send(challenge);
		} else {
			// Respond with '403 Forbidden' if verify tokens do not match
			res.sendStatus(403);
		}
	}
});

app.post("/messaging-webhook", (req, res) => {
	console.log("requetsed==============>send");
	let body = req.body;

	console.log(`\u{1F7EA} Received webhook:`);
	console.dir(body, { depth: null });
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
