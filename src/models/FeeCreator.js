import TaxFee from "./TaxFee";
import ServiceFee from "./ServiceFee";

export default class FeeCreator {
  createFee({ flight, feePackage }) {
    let lifeInsurance, bagInsurance;

    const tax = new TaxFee({ extraFee: flight });
    switch (feePackage) {
      case "LIFE":
        lifeInsurance = new ServiceFee({
          extraFee: tax,
          service: "LIFE_INSURANCE"
        });
        return lifeInsurance;
      case "BAG":
        bagInsurance = new ServiceFee({
          extraFee: tax,
          service: "BAG_INSURANCE"
        });
        return bagInsurance;
      case "LIFENBAG":
        lifeInsurance = new ServiceFee({
          extraFee: tax,
          service: "LIFE_INSURANCE"
        });
        bagInsurance = new ServiceFee({
          extraFee: lifeInsurance,
          service: "BAG_INSURANCE"
        });
        return bagInsurance;
      default:
        return tax;
    }
  }
}
