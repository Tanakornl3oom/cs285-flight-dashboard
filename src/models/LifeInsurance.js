import ExtraFee from "./ExtraFee";

export default class LifeInsurance extends ExtraFee {
	constructor({ extraFee }) {
		super({ baseFee: extraFee });
	}

	getFee() {
		return 1000;
	}
}
