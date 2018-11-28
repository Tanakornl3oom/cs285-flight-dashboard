import axios from "axios";

const API_URL = "https://api.myjson.com/bins/v7o1e";

const fetchFlights = async () => {
	try {
		const { data } = await axios.get(API_URL);
		return data;
	} catch (error) {
		throw error;
	}
};

let flights;
(async () => {
	flights = await fetchFlights();
})();
export { flights };

export const findFlightById = ({ flightId }) => {
	return new Promise(resolve => {
		flights.forEach(flight => {
			const { id } = flight;
			if (flightId === id) resolve(flight);
		});
		resolve({});
	});
};
