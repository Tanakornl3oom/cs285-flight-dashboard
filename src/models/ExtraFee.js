import FlightFee from "./FlightFee";

export default class ExtraFee extends FlightFee {
	constructor({ baseFee }) {
		super();
		this.baseFee = baseFee;
	}

	getTotalFee() {
		return this.baseFee.getTotalFee() + this.getFee();
	}
}
