const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const VERIFY_TOKEN = "thisistesttoken";
const PAGE_ACCESS_TOKEN =
	"EAAJnWdBLtD0BO6k9iHuXk7BXsxkqELRtp31nZBX1AFWjoDe9UFZCPH3aEISsv0Szb0WrQZCjxnzWgUJC9UzPs2qi811onx7H9KyFSurZC7SjIQmjO6pVTskaImgBbKnxWHZAfQhSoFUCv0igdu0L6kHX9wHslBMj0ZAN3EVvz1XDFyFnEIrRR3zROu5JqtTPZCYvvN0ctUZD";

app.use(bodyParser.json());

// URL 1: /webhook
app.get("/webhook", (req, res) => {
	let body = req.body;

	console.log(`\u{1F7EA} Received webhook:`);
	console.dir(body, { depth: null });
	if (body.object === "page") {
		// Returns a '200 OK' response to all requests
		res.status(200).send("EVENT_RECEIVED");

		// Determine which webhooks were triggered and get sender PSIDs and locale, message content and more.
	} else {
		// Return a '404 Not Found' if event is not from a page subscription
		res.sendStatus(404);
	}
});

// URL 3: /send-message
app.post("/send-message", (req, res) => {
	//   const { recipientId, message } = req.body;

	if (!recipientId || !message) {
		return res
			.status(400)
			.json({ error: "Recipient ID and message are required." });
	}

	axios
		.post(
			"https://graph.facebook.com/v12.0/me/messages",
			{
				messaging_type: "RESPONSE",
				recipient: {
					id: "122093648912167673",
				},
				message: {
					text: "Hi test message from api",
				},
			},
			{
				params: {
					access_token: PAGE_ACCESS_TOKEN,
				},
			}
		)
		.then((response) => {
			console.log("Message sent:", response.data);
			res
				.status(200)
				.json({ success: true, message: "Message sent successfully." });
		})
		.catch((error) => {
			console.error("Error sending message:", error.response.data);
			res.status(500).json({ error: "Error sending message." });
		});
});

// URL 4: /test
app.get("/test", (req, res) => {
	console.log("GET Request to /test");
	res.status(200).send("This is a simple GET endpoint for testing.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
