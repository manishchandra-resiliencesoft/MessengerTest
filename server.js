const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const VERIFY_TOKEN = "thisistesttoken";
const PAGE_ACCESS_TOKEN =
	"EAAJnWdBLtD0BO6k9iHuXk7BXsxkqELRtp31nZBX1AFWjoDe9UFZCPH3aEISsv0Szb0WrQZCjxnzWgUJC9UzPs2qi811onx7H9KyFSurZC7SjIQmjO6pVTskaImgBbKnxWHZAfQhSoFUCv0igdu0L6kHX9wHslBMj0ZAN3EVvz1XDFyFnEIrRR3zROu5JqtTPZCYvvN0ctUZD";

app.use(bodyParser.json());

// Add support for GET requests to our webhook
app.get("/messaging-webhook", (req, res) => {
	console.log("requetsed==============>");
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

app.post("/send-message", (req, res) => {
	console.log("requetsed==============>send");
	let body = req.body;

	console.log(`\u{1F7EA} Received webhook:`);
	console.dir(body, { depth: null });
});
