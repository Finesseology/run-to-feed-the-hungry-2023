import express from "express";
import dotenv from "dotenv";

import fetchAuthenticationData from "./auth/authentication.js";
import fetchParticipantMetadata from "./api-calls/api-calls.js";

const router = express.Router();
dotenv.config();

let authData = null;
let accessToken = null;
let expirationTime = new Date();
let currentTime = new Date();

// Split the total race participants number out from race metadata
function parseTotalResults(metaData) {
	if (metaData && typeof metaData.totalResults === "number") {
		return metaData.totalResults;
	} else {
		return null;
	}
}

// Updates the userCount
async function getTotalResults(accessToken) {
	const metaData = await fetchParticipantMetadata(accessToken);
	const totalResults = parseTotalResults(metaData);
	return totalResults;
}

async function mainLogic() {
	try {
		const msInOneHour = 3600000; //1 hour in milliseconds
		const msIn23Hr59Min = 86340000; //23 hours 59 minutes in milliseconds
		currentTime = Date.now();
		let timeDifference = expirationTime - currentTime; // time in ms

		// if auth token has less than one hour until it expires
		if (timeDifference < msInOneHour) {
			authData = await fetchAuthenticationData();
			accessToken = authData.data.access_token;
			expirationTime = currentTime + authData.data.expires_in * 1000; // set expiration time in milliseconds
			return getTotalResults(accessToken);
		} else {
			return getTotalResults(accessToken);
		}
	} catch (error) {
		console.error("An error occurred:", error.message);
	}
}

router.get("/", async (req, res) => {
	try {
		const response = await mainLogic();
		res.json(response);
	} catch (error) {
		console.error("Error during getTotalParticipants:", error.message);
		res.status(500).json({ error: "Couldn't get participants." });
	}
});

export default router;
