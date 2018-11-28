import FlightFee from "./FlightFee";

export default class Flight extends FlightFee {
	constructor({ id, price, airLine, takeOff, landing, stop = 1, tax = 0 }) {
		super();
		this.id = id;
		this.price = price;
		this.airLine = airLine;
		this.takeOff = takeOff;
		this.landing = landing;
		this.stop = stop;
		this.tax = tax;
	}
	getFee() {
		return this.price;
	}
	getTotalFee() {
		return this.getFee();
	}
}
