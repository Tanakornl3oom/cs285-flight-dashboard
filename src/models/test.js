import FeeCreator from "./FeeCreator";
import Flight from "./Flight";

const flight = new Flight({
	id: 1,
	price: 100,
	airLine: "SG",
	takeOff: "09:00",
	landing: "10:00"
});

const feeCreator = new FeeCreator();
const fee = feeCreator.createFee({ flight, feePackage: "LIFE" });
console.log(fee.getTotalFee());
