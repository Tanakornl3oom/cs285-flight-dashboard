import ExtraFee from "./ExtraFee";

export default class TaxFee extends ExtraFee {
	constructor({ extraFee }) {
		super({ baseFee: extraFee });
	}

	getFee() {
		return 1000;
	}
}
