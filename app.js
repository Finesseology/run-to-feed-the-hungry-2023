import express from "express";
import cors from "cors";

import getTotalParticipants from "./routes/middleware.js";

const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json()); // Add this line to parse JSON requests

// Routes
app.use("/getTotalParticipants", getTotalParticipants);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
