require('dotenv').config()
const express = require("express");
const app = express();
const eventRouter = require("./routes/eventRouter");
const { unknownEndpoint,errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");

// Middlewares
app.use(cors())
app.use(express.json());

connectDB();

// // Serve the static files from the React app (frontend) in the dist folder
// app.use(express.static('view'))

// Use the eventRouter for all "/events" routes
app.use("/api/events", eventRouter);

// // Path
// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '/view/index.html');
// });

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;
