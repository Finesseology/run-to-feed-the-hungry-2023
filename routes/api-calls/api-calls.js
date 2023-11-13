import dotenv from "dotenv";
dotenv.config();

const apiURL = `https://raceroster.com/api/v1/events/${process.env.RTFH_EVENT_ID}/participants`;

// Fetch all of the Participant Meta Data
async function fetchParticipantMetadata(accessToken) {
	try {
		const response = await fetch(apiURL, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		if (!response.ok) {
			const errorMessage = await response.text();
			throw new Error(`Error fetching participant metadata with status ${response.status}. ${errorMessage}`);
		}

		const responseData = await response.json();
		const metadata = responseData.metadata;

		return metadata;
	} catch (error) {
		console.error("Error fetching participant metadata:", error.message);
		return null;
	}
}

export default fetchParticipantMetadata;
