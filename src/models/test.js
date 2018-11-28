import Flight from "./Flight";
import ServiceFee from "./ServiceFee";
const flightFee = new Flight({
	id: 1,
	price: 100,
	airLine: "SG",
	takeOff: "09:00",
	landing: "10:00"
});
console.log("flightFee", flightFee);
const lifeInsurance = new ServiceFee({
	extraFee: flightFee,
	service: "LIFE_INSURANCE"
});
console.log("lifeInsurance", lifeInsurance);
console.log("total", lifeInsurance.getTotalFee());
