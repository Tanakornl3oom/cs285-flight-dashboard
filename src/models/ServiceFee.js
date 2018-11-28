import ExtraFee from "./ExtraFee";
import BagInsurance from "./BagInsurance";
import LifeInsurance from "./LifeInsurance";

export default class ServiceFee extends ExtraFee {
	constructor({ extraFee, service }) {
		switch (service) {
			case "LIFE_INSURANCE":
				return new BagInsurance({ extraFee });
			case "BAG_INSURANCE":
				return new LifeInsurance({ extraFee });
		}
	}

	getFee() {
		return 1000;
	}
}
