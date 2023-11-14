const userCountElement = document.getElementById("userCount");

// Initialize Odometer
const odometer = new Odometer({
	el: userCountElement,
	format: "(,ddd)",
	theme: "minimal",
});

async function fetchTotalParticipants() {
	try {
		const response = await fetch("/getTotalParticipants", {
			method: "GET",
		});

		if (!response.ok) {
			const errorMessage = await response.text();
			throw new Error(`Error fetching participant metadata with status ${response.status}. ${errorMessage}`);
		}

		const responseData = await response.json();
		return responseData;
	} catch (error) {
		console.error("Error fetching participant metadata:", error.message);
		return null;
	}
}

async function updateUserCount() {
	const totalResults = await fetchTotalParticipants();
	console.log("new.");
	odometer.update(totalResults);
}

async function main() {
	await updateUserCount();
	setInterval(updateUserCount, 30000); // every 30 seconds. time in milliseconds
}

main();
