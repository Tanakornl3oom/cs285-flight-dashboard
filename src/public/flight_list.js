/* jquery global */

const flightsBadge = $("#flights-badge");
const flightsPageTotal = $("#flights-page-total");

const flightsTable = $("#table-body-2");
const flightsTableListView = $("#table-body-1");

const flightsPagination = $("#flights-pagination");
const flightsPaginationListView = $("#flights-pagination1");

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

function renderFlightsRowListView(flights) {
  flightsTableListView.html("");

  flights.forEach((flight, index) => {
    const tableData = `<tr>
			<td><a class="flight-price price">${flight.price} $</a></td>
			<td>${flight.airLine} <img src="/AirAsia.png" width="50" height="50"></td>
			<td><p class="takeland">${flight.takeOff}</p></td>
			<td><p class="takeland">${flight.landing}</p></td>
			<td>
			${flight.stop}<br>
			<a data-toggle="collapse" data-target="#detail${index}">detail</a>
			&nbsp&nbsp<span class="glyphicon glyphicon-print"></span>
			&nbsp&nbsp<span class="glyphicon glyphicon-envelope"></span>
			&nbsp&nbsp<span class="glyphicon glyphicon-heart"></span>
			&nbsp&nbsp<span class="glyphicon glyphicon-trash"></span>
			</td>
		</tr>
		<tr id="detail${index}" class="collapse">
		<td colspan="5">
		  <div class="container-fluid"> 
			<h3><font color="blue">OUTBOUND</font></h3>
			<p> ${flight.airLine} October 1 th,2015</p>
			<div class="col-sm-3 "> 
			<img align="middle" src="/Aot.jpg" width="120" height="120"></div>
			<div style="display: inline-block">
			<span> Time : 10.00 </span>
			<h5> AirPort : Suvanabhumi </h5>
				<h5>Terminal : </h5>
			<hr>
			<span> Time : 23.00</span>
			<h5> AirPort : Paris Charles-de-Gaulle </h5>
			<h5>Terminal : 2C</h5>
			
			</div>
		  </div>
		  <p>flight# : SU 217 | aircraft type :3333 | operatedby : Aeroflc</p>
		  <button class="btn-primary btn btn-lg">Select</button>
		</td>
	  </tr>
	  `;
    flightsTableListView.append(tableData);
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
    renderFlightsRowListView(data.flights);
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
