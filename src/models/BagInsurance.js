import ExtraFee from "./ExtraFee";

export default class BagInsurance extends ExtraFee {
	constructor({ extraFee }) {
		super({ baseFee: extraFee });
	}

	getFee() {
		return 350;
	}
}
