const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
// const { MessengerBot } = require("fb-messenger-bot-api");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Replace 'YOUR_PAGE_ACCESS_TOKEN' with your actual Page Access Token
// const bot = new MessengerBot({
//   pageAccessToken: "YOUR_PAGE_ACCESS_TOKEN",
//   verifyToken: "YOUR_VERIFY_TOKEN",
// });

// app.use("/webhook", bot.middleware());

// bot.on("message", (message) => {
//   // Handle incoming messages (optional)
//   console.log(message);
// });

// Endpoint for sending a message
// app.post("/send-message", async (req, res) => {
//   const { recipientId, messageText } = req.body;

//   try {
//     await bot.sendMessage(recipientId, { text: messageText });
//     res
//       .status(200)
//       .json({ success: true, message: "Message sent successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Error sending message" });
//   }
// });

app.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object === "page") {
    body.entry.forEach((entry) => {
      const webhookEvent = entry.messaging[0];
      const senderId = webhookEvent.sender.id;
      // Use senderId to send a response or store it for later use

      console.log("senderId==========>", senderId);
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

app.post("/send-message", async (req, res) => {
  //   const { recipientId, messageText, accessToken } = req.body;

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v12.0/122093648912167673/messages`,
      {
        message: { text: "Hi testing from api" },
        messaging_type: "RESPONSE",
      },
      {
        params: {
          access_token:
            "EAAJnWdBLtD0BOzDZBZA0x7X2vLpOIZADlVi5ZCS29GElga0A3TIghUNsZBz9ZAdigqp0dlKFjYmjOZBlOjze8gXX7UKANUgz6nbOM0pXcW2Bf36PEklZB4hr0sxztiiZANUYxOlLyTpAu5mOiEpmQhMheYEhnCMsmqpX7PLVxBnjo5rzqVRUcOUMsUG9eajtO6OQH",
        },
      }
    );

    console.log(response.data);
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending message" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
