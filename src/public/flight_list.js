/* jquery global */

const flightsBadge = $("#flights-badge");
const flightsPageTotal = $("#flights-page-total");

const flightsTable = $("#table-body-2");

const flightsPagination = $("#flights-pagination");

const defaultPageNumber = 1;
const defaultItemsPerPage = 3;

let currentPageSelection = 1;
let maximumPageSelection = 3;

function renderFlightsRow(flights) {
	flightsTable.html("");

	flights.forEach(flight => {
		const tableData = `<tr>
			<td><p class="flight-price">${flight.price}</p></td>
			<td>${flight.airLine}</td>
			<td>${flight.takeOff}</td>
			<td>${flight.landing}</td>
			<td>${flight.stop}</td>
		</tr>`;
		flightsTable.append(tableData);
	});
}

function prevPagination() {
	if (currentPageSelection > 1) fetchFlights(--currentPageSelection);
}
function nextPagination() {
	if (currentPageSelection < maximumPageSelection)
		fetchFlights(++currentPageSelection);
}
function renderFlightsPagination(flightsPageTotal) {
	flightsPagination.html("");

	flightsPagination.append(
		`<li class="page-item">
			<a class="page-link" href="#" onclick="prevPagination()">Previous</a>
		</li>`
	);
	for (let i = 0; i < flightsPageTotal; i++) {
		flightsPagination.append(
			`<li id="page-link-${i +
				1}" class="page-item" ><a class="page-link" href="#" onclick="fetchFlights(${i +
				1})">${i + 1}</a></li>`
		);
	}
	flightsPagination.append(
		`<li class="page-item">
			<a class="page-link" href="#" onclick="nextPagination()">Next</a>
		</li>`
	);
}

function fetchFlights(
	pageNumber = defaultPageNumber,
	itemsPerPage = defaultItemsPerPage
) {
	let query;
	if (!pageNumber && !itemsPerPage) query = "";
	else if (pageNumber && itemsPerPage)
		query = `pageNumber=${pageNumber}&itemsPerPage=${itemsPerPage}`;
	else if (pageNumber) query = `pageNumber=${pageNumber}`;
	else if (itemsPerPage) query = `itemsPerPage=${itemsPerPage}`;

	$.get(`/flights?${query}`, data => {
		maximumPageSelection = data.flightsPageTotal;

		renderFlightsRow(data.flights);
		//Header table navigation
		flightsBadge.html(data.pageNumber);
		flightsPageTotal.html(data.flightsPageTotal);

		//Bottom table navigation
		renderFlightsPagination(data.flightsPageTotal);
		$(`#page-link-${currentPageSelection}`).removeClass("active");
		$(`#page-link-${pageNumber}`).addClass("active");
		currentPageSelection = pageNumber;
	});
}

$(document).ready(() => {
	fetchFlights(defaultPageNumber, defaultItemsPerPage);
});