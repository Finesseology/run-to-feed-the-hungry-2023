import dotenv from "dotenv";
dotenv.config();

const authURL = "https://raceroster.com/api/oauth/authorize";

const body = new URLSearchParams({
	grant_type: "access_token",
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET,
	username: process.env.RR_USERNAME,
	password: process.env.RR_PASSWORD,
});

const headers = {
	Accept: "application/json",
	"Content-Type": "application/x-www-form-urlencoded",
};

async function fetchAuthenticationData() {
	try {
		const response = await fetch(authURL, {
			method: "POST",
			headers: headers,
			body: body,
		});

		if (!response.ok) {
			const errorMessage = await response.text();
			throw new Error(`Authentication failed with status: ${response.status}. ${errorMessage}`);
		}

		const responseData = await response.json();

		console.log("Authentication successful. Response Data:", responseData);

		return responseData;
	} catch (error) {
		console.error("Error during authentication:", error.message);
		res.status(500).json({ error: "Authentication failed" });
	}
}

export default fetchAuthenticationData;
